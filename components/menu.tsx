// components/SimpleHamburgerMenu.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";

export default function Menu() {
  const [visible, setVisible] = useState(false);
  const menuItems = [
    { id: "1", title: "Notificacion" },
    { id: "2", title: "Tu progreso" },
    { id: "3", title: "Nuevos libros" },
    { id: "4", title: "Libros favoritos" },
    { id: "5", title: "Configuración" },
    { id: "6", title: "cerrar sesion" },
  ];
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
                source={require("../assets/images/Logo.png")}
              />
              <View style={styles.userSection}>
                <Image
                  style={styles.avatar}
                  source={require("../assets/images/Captura de pantalla 2025-11-19 a la(s) 5.05.03 p.m. 1.png") }
                />
                <Text style={styles.userName}>Juan Pérez</Text>
                <Text style={styles.userEmail}>@juan_23</Text>
              </View>
            </View>
            <ScrollView style={styles.menuList}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => {
                    setVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Text style={styles.logoutIcon}>🚪</Text>
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
  itemIcon: {
    fontSize: 22,
    marginRight: 15,
    width: 30,
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
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
