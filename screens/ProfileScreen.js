import { useContext } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { COLORS, FONTS } from '../utils/globalStyles';

const ProfileScreen = ({ navigation }) => {
  const { student, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          onPress: async () => {
            try {
              await logout();
              console.log('Logout completed successfully');
            } catch (error) {
              console.error('Logout failed:', error);
            }
          }, 
          style: 'destructive' 
        },
      ]
    );
  };

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header with Profile Image */}
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          {student?.image ? (
            <Image
              source={{ uri: student.image }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>
                {student?.fullname?.charAt(0)}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{student?.fullname}</Text>
        <Text style={styles.nni}>NNI: {student?.nni}</Text>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations Personnelles</Text>
        <View style={styles.card}>
          <InfoRow label="Nom Complet" value={student?.fullname} />
          <InfoRow label="NNI" value={student?.nni} />
          <InfoRow label="Nom du Parent" value={student?.parent_name} />
          <InfoRow label="Téléphone" value={student?.phone} />
        </View>
      </View>

      {/* Class Information */}
      {student?.class && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de la Classe</Text>
          <View style={styles.card}>
            <InfoRow label="Classe" value={student.class.nom} />
            <InfoRow label="Niveau" value={student.class.niveau} />
            {student.class.specialite && (
              <InfoRow label="Spécialité" value={student.class.specialite} />
            )}
            <InfoRow label="Année Scolaire" value={student.class.annee} />
          </View>
        </View>
      )}

      {/* Actions */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={styles.scheduleButtonText}>Voir l'Emploi du Temps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      {/* Footer spacing */}
      <View style={{ height: 40 }} />
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
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  nni: {
    fontSize: 14,
    color: '#fff',
    fontFamily: FONTS.regular,
    marginTop: 4,
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
    fontFamily: FONTS.bold,
    textAlign: 'right',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
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
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  logoutButtonText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
});

export default ProfileScreen;
