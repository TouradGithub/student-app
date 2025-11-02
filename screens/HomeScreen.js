import { useContext } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { COLORS, FONTS } from '../utils/globalStyles';

const HomeScreen = ({ navigation }) => {
  const { student, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logout from HomeScreen completed');
    } catch (error) {
      console.error('Logout from HomeScreen failed:', error);
    }
  };

  const handleViewSchedule = () => {
    navigation.navigate('Schedule');
  };

  const handleViewProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Bonjour</Text>
            <Text style={styles.studentName}>{student?.fullname}</Text>
          </View>
          {student?.image && (
            <Image
              source={{ uri: student.image }}
              style={styles.profileImage}
            />
          )}
        </View>
      </View>

      {/* Class Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Informations de la Classe</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Classe:</Text>
            <Text style={styles.infoValue}>{student?.class?.nom}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Niveau:</Text>
            <Text style={styles.infoValue}>{student?.class?.niveau}</Text>
          </View>
          {student?.class?.specialite && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Spécialité:</Text>
              <Text style={styles.infoValue}>{student?.class?.specialite}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Année Scolaire:</Text>
            <Text style={styles.infoValue}>{student?.class?.annee}</Text>
          </View>

          {/* View Schedule Button */}
          <TouchableOpacity
            style={styles.scheduleButton}
            onPress={handleViewSchedule}
          >
            <Text style={styles.scheduleButtonText}>
              Voir l'Emploi du Temps
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Actions Rapides</Text>
        
        <TouchableOpacity
          style={styles.actionCard}
          onPress={handleViewProfile}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>👤</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Profil</Text>
            <Text style={styles.actionSubtitle}>Voir vos informations personnelles</Text>
          </View>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={handleViewSchedule}
        >
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>📅</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Emploi du Temps</Text>
            <Text style={styles.actionSubtitle}>Voir l'horaire des cours</Text>
          </View>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionCard, styles.logoutCard]}
          onPress={handleLogout}
        >
          <View style={[styles.actionIcon, styles.logoutIcon]}>
            <Text style={styles.actionIconText}>🚪</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, styles.logoutText]}>
              Déconnexion
            </Text>
            <Text style={styles.actionSubtitle}>Quitter le compte</Text>
          </View>
          <Text style={styles.actionArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    fontFamily: FONTS.regular,
    textAlign: 'right',
  },
  studentName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
    marginTop: 4,
    textAlign: 'right',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
    textAlign: 'right',
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    fontFamily: FONTS.medium,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
    textAlign: 'right',
    flex: 1,
  },
  scheduleButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  actionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    fontFamily: FONTS.bold,
    textAlign: 'right',
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  actionSubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    fontFamily: FONTS.regular,
    marginTop: 2,
  },
  actionArrow: {
    fontSize: 20,
    color: COLORS.textLight,
  },
  logoutCard: {
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  logoutIcon: {
    backgroundColor: '#FFE5E5',
  },
  logoutText: {
    color: COLORS.danger,
  },
});

export default HomeScreen;
