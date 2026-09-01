import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { authService } from '../services/authService';
import { User } from '../services/auth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface MenuItem {
  id: string;
  title: string;
  screen: keyof RootStackParamList;
}

export default function Menu() {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  const menuItems: MenuItem[] = [
    { id: "1", title: "Notificacion", screen: "Index" },
    { id: "2", title: "Tu progreso", screen: "Index" },
    { id: "3", title: "Nuevo libro", screen: "AddBook" },
    { id: "4", title: "Libros favoritos", screen: "Index" },
    { id: "5", title: "Configuración", screen: "Index" },
  ];

  // Cargar datos del usuario cuando se abre el menú
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      loadUser();
    }
  }, [visible]);

  const handleNavigate = (screen: keyof RootStackParamList) => {
    setVisible(false);
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setVisible(false);
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.hamburgerButton}
        onPress={() => setVisible(true)}
      >
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          />
          <View style={styles.menuPanel}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>

              <Image
                style={styles.logo}
                source={{ uri: 'https://via.placeholder.com/60/92e2db/000000?text=Logo' }}
              />
              
              <View style={styles.userSection}>
                {loading ? (
                  <ActivityIndicator size="small" color="#222121ff" />
                ) : user ? (
                  <>
                    <Image
                      style={styles.avatar}
                      source={{ 
                        uri: user.avatar_url || 'https://via.placeholder.com/80/92e2db/000000?text=User'
                      }}
                    />
                    <Text style={styles.userName}>{user.nombre}</Text>
                    <Text style={styles.userEmail}>@{user.username}</Text>
                    <Text style={styles.userStats}>
                      XP: {user.xp} | Seguidores: {user.seguidores}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.userEmail}>No hay usuario</Text>
                )}
              </View>
            </View>

            <ScrollView style={styles.menuList}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => handleNavigate(item.screen)}
                >
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  hamburgerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    padding: 8,
  },
  line: {
    width: 25,
    height: 3,
    backgroundColor: "#000",
    marginVertical: 2.5,
    borderRadius: 2,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuPanel: {
    width: "80%",
    maxWidth: 320,
    backgroundColor: "#FFF",
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: "#92e2dbff",
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 10,
  },
  closeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 15,
    borderRadius: 30,
  },
  userSection: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  userStats: {
    fontSize: 12,
    color: "#555",
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  arrow: {
    fontSize: 24,
    color: "#999",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#b40f0fff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});