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
            ->with(['classe', 'user'])
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
     * Get Student Schedule
     */
    public function schedule(Request $request)
    {
        try {
            $user = $request->user();
            $student = Student::where('user_id', $user->id)
                ->with(['classe'])
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

            // Get schedule for student's class
            $emploisTemps = EmploiTemps::where('class_id', $student->classe->id)
                ->with([
                    'matiere',
                    'enseignant',
                    'trimestre',
                    'jour',
                    'horaires'
                ])
                ->get();

            // Group by day
            $schedule = [];
            $jours = Jour::orderBy('ordre')->get();

            foreach ($jours as $jour) {
                $daySchedule = $emploisTemps->where('jour_id', $jour->id);
                
                if ($daySchedule->count() > 0) {
                    $schedule[$jour->nom] = $daySchedule->map(function ($emploi) {
                        return [
                            'id' => $emploi->id,
                            'subject' => [
                                'id' => $emploi->matiere->id ?? null,
                                'name' => $emploi->matiere->nom ?? 'غير محدد',
                            ],
                            'teacher' => [
                                'id' => $emploi->enseignant->id ?? null,
                                'name' => $emploi->enseignant->nom ?? 'غير محدد',
                            ],
                            'trimester' => [
                                'id' => $emploi->trimestre->id ?? null,
                                'name' => $emploi->trimestre->nom ?? 'غير محدد',
                            ],
                            'horaires' => $emploi->horaires ? $emploi->horaires->map(function ($horaire) {
                                return [
                                    'id' => $horaire->id,
                                    'start_time' => $horaire->heure_debut,
                                    'end_time' => $horaire->heure_fin,
                                    'libelle_fr' => $horaire->libelle_fr,
                                    'libelle_ar' => $horaire->libelle_ar,
                                ];
                            })->toArray() : [],
                        ];
                    })->toArray();
                }
            }

            return response()->json([
                'success' => true,
                'message' => 'تم جلب الجدول الزمني بنجاح',
                'data' => [
                    'class_info' => [
                        'id' => $student->classe->id,
                        'nom' => $student->classe->nom,
                    ],
                    'schedule' => $schedule,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء جلب الجدول الزمني: ' . $e->getMessage()
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
