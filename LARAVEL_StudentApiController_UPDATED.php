<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\EmploiTemps;
use App\Models\Jour;
use App\Models\Horaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentApiController extends Controller
{
    /**
     * Student Login
     */
    public function login(Request $request)
    {
        $request->validate([
            'nni' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find student by NNI
        $student = Student::where('nni', $request->nni)
            ->with(['classe.niveau', 'classe.specialite', 'classe.annee', 'user'])
            ->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'رقم التعريف الوطني غير صحيح'
            ], 401);
        }

        // Check if user exists
        if (!$student->user) {
            return response()->json([
                'success' => false,
                'message' => 'لم يتم إنشاء حساب لهذا الطالب'
            ], 401);
        }

        // Verify password
        if (!Hash::check($request->password, $student->user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'كلمة المرور غير صحيحة'
            ], 401);
        }

        // Create token
        $token = $student->user->createToken('student-app')->plainTextToken;

        // Prepare response
        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الدخول بنجاح',
            'data' => [
                'student' => [
                    'id' => $student->id,
                    'nni' => $student->nni,
                    'fullname' => $student->fullname,
                    'parent_name' => $student->parent_name,
                    'phone' => $student->phone,
                    'image' => $student->image ? asset('storage/' . $student->image) : null,
                    'class' => $student->classe ? [
                        'id' => $student->classe->id,
                        'nom' => $student->classe->nom,
                        'niveau' => $student->classe->niveau->nom ?? '',
                        'specialite' => $student->classe->specialite->nom ?? '',
                        'annee' => $student->classe->annee->annee ?? '',
                    ] : null,
                ],
                'token' => $token,
            ]
        ]);
    }

    /**
     * Get Student Profile
     */
    public function profile(Request $request)
    {
        try {
            $user = $request->user();
            $student = Student::where('user_id', $user->id)
                ->with(['classe.niveau', 'classe.specialite', 'classe.annee'])
                ->first();

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'الطالب غير موجود'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'تم جلب البيانات بنجاح',
                'data' => [
                    'id' => $student->id,
                    'nni' => $student->nni,
                    'fullname' => $student->fullname,
                    'parent_name' => $student->parent_name,
                    'phone' => $student->phone,
                    'image' => $student->image ? asset('storage/' . $student->image) : null,
                    'class' => $student->classe ? [
                        'id' => $student->classe->id,
                        'nom' => $student->classe->nom,
                        'niveau' => $student->classe->niveau->nom ?? '',
                        'specialite' => $student->classe->specialite->nom ?? '',
                        'annee' => $student->classe->annee->annee ?? '',
                    ] : null,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Download Student Schedule PDF
     */
    public function schedulePdf(Request $request)
    {
        try {
            $user = $request->user();
            $student = Student::where('user_id', $user->id)
                ->with(['classe.niveau', 'classe.specialite', 'classe.annee'])
                ->first();

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'الطالب غير موجود'
                ], 404);
            }

            if (!$student->classe) {
                return response()->json([
                    'success' => false,
                    'message' => 'الطالب غير مسجل في أي فصل'
                ], 404);
            }

            // Get schedule data
            $classe = $student->classe;
            $emplois_temps = EmploiTemps::where('class_id', $classe->id)
                ->with(['matiere', 'enseignant', 'trimestre', 'jour', 'horaires'])
                ->get();

            // Generate calendar data (you may need to adjust this based on your generateDataCalendar method)
            $jours = Jour::orderBy('ordre')->get();
            $horaires = Horaire::orderBy('ordre')->get();

            // Create PDF
            $mpdf = new \Mpdf\Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'L', // Landscape
                'margin_left' => 10,
                'margin_right' => 10,
                'margin_top' => 10,
                'margin_bottom' => 10,
            ]);

            $mpdf->SetAuthor('Student Schedule System');
            $mpdf->SetTitle('جدول الطالب - ' . $student->fullname);
            $mpdf->SetSubject('Student Schedule PDF');
            
            // Use DejaVu fonts for Arabic support
            $mpdf->autoScriptToLang = true;
            $mpdf->autoLangToFont = true;

            // Generate HTML content
            $html = view('admin.students.pdf.student_schedule_pdf', [
                'student' => $student,
                'classe' => $classe,
                'emplois_temps' => $emplois_temps,
                'jours' => $jours,
                'horaires' => $horaires,
            ])->render();

            $mpdf->WriteHTML($html);

            $mpdf->SetHTMLFooter('
                <table width="100%" style="font-family: DejaVu Sans;">
                    <tr>
                        <td align="left">الطالب: ' . $student->fullname . '</td>
                        <td align="center">تاريخ الطباعة: {DATE j-m-Y}</td>
                        <td align="right">صفحة {PAGENO} من {nbpg}</td>
                    </tr>
                </table>'
            );

            $filename = 'schedule_' . $student->nni . '_' . date('Y-m-d') . '.pdf';

            // Return PDF as download
            return response()->streamDownload(function() use ($mpdf) {
                echo $mpdf->Output('', 'S');
            }, $filename, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء إنشاء ملف PDF: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Student Logout
     */
    public function logout(Request $request)
    {
        try {
            // Revoke current token
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'success' => true,
                'message' => 'تم تسجيل الخروج بنجاح'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء تسجيل الخروج'
            ], 500);
        }
    }
}
