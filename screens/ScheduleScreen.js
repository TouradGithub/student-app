import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { STUDENT_API_URL } from '../config/apiConfig';
import { COLORS, FONTS } from '../utils/globalStyles';

const ScheduleScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [scheduleData, setScheduleData] = useState(null);
  const [classInfo, setClassInfo] = useState(null);
  const [student, setStudent] = useState(null);

  const fetchScheduleData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Erreur', 'Veuillez vous reconnecter');
        return;
      }

      const response = await fetch(`${STUDENT_API_URL}/schedule/data`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setScheduleData(result.data.schedule_matrix);
        setClassInfo(result.data.class_info);
        setStudent(result.data.student);
      } else {
        Alert.alert('Erreur', result.message || 'Échec du chargement de l\'emploi du temps');
      }
    } catch (error) {
      console.error('Schedule Data Error:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors du chargement de l\'emploi du temps');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchScheduleData();
  };

  const renderClassCell = (classData) => {
    if (!classData || !classData.has_class || classData.empty) {
      return (
        <View style={styles.emptyCell}>
          <Text style={styles.emptyCellText}>-</Text>
        </View>
      );
    }

    return (
      <View style={styles.classCell}>
        <Text style={styles.subjectText} numberOfLines={2}>
          {classData.subject}
        </Text>
        {classData.teacher && (
          <Text style={styles.teacherText} numberOfLines={1}>
            👨‍🏫 {classData.teacher}
          </Text>
        )}
      </View>
    );
  };

  const renderTimeRow = (rowData, index) => {
    const timeInfo = rowData.time_info;
    
    return (
      <View key={index} style={styles.scheduleRow}>
        {/* Time Column */}
        <View style={styles.timeCell}>
          <Text style={styles.timeText}>
            {timeInfo.libelle_ar || timeInfo.libelle_fr}
          </Text>
        </View>

        {/* Day Columns */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.daysScroll}
        >
          {rowData.classes.map((dayClass, dayIndex) => (
            <View key={dayIndex} style={styles.dayCell}>
              {renderClassCell(dayClass.class_data)}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderDayHeaders = () => {
    if (!scheduleData || scheduleData.length === 0) return null;
    
    const firstRow = scheduleData[0];
    
    return (
      <View style={styles.headerRow}>
        {/* Empty cell for time column */}
        <View style={styles.timeHeaderCell}>
          <Text style={styles.headerText}>Heure</Text>
        </View>

        {/* Day headers */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.daysScroll}
        >
          {firstRow.classes.map((dayClass, index) => (
            <View key={index} style={styles.dayHeaderCell}>
              <Text style={styles.dayHeaderText}>
                {dayClass.day_info.libelle_ar || dayClass.day_info.libelle_fr}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement de l'emploi du temps...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Emploi du Temps</Text>
        {classInfo && (
          <Text style={styles.className}>{classInfo.nom}</Text>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Info Card */}
        {student && (
          <View style={styles.infoCard}>
            <Text style={styles.studentName}>👤 {student.fullname}</Text>
            {classInfo && (
              <View style={styles.classInfoRow}>
                <Text style={styles.classInfoText}>
                  📚 {classInfo.niveau} - {classInfo.specialite}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Schedule Table */}
        {scheduleData && scheduleData.length > 0 ? (
          <View style={styles.tableContainer}>
            {renderDayHeaders()}
            {scheduleData.map((rowData, index) => renderTimeRow(rowData, index))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📅</Text>
            <Text style={styles.emptyMessage}>Aucun emploi du temps disponible</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textLight,
    fontFamily: FONTS.regular,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: FONTS.bold,
    textAlign: 'right',
  },
  className: {
    fontSize: 16,
    color: '#fff',
    fontFamily: FONTS.regular,
    marginTop: 4,
    textAlign: 'right',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
    textAlign: 'right',
    marginBottom: 8,
  },
  classInfoRow: {
    marginTop: 4,
  },
  classInfoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: 'right',
  },
  tableContainer: {
    margin: 16,
    marginTop: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  timeHeaderCell: {
    width: 80,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.3)',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: FONTS.bold,
  },
  daysScroll: {
    flex: 1,
  },
  dayHeaderCell: {
    width: 120,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.3)',
  },
  dayHeaderText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: FONTS.bold,
  },
  scheduleRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timeCell: {
    width: 80,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    textAlign: 'center',
  },
  dayCell: {
    width: 120,
    minHeight: 70,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    justifyContent: 'center',
  },
  classCell: {
    backgroundColor: COLORS.primaryLight,
    padding: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  subjectText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
    textAlign: 'right',
    marginBottom: 4,
  },
  teacherText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    textAlign: 'right',
  },
  emptyCell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  emptyCellText: {
    fontSize: 16,
    color: COLORS.textLight,
    fontFamily: FONTS.regular,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyText: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 16,
    color: COLORS.textLight,
    fontFamily: FONTS.regular,
    textAlign: 'center',
  },
});

export default ScheduleScreen;
