import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

type NotFoundScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NotFound'>;

interface Props {
  navigation: NotFoundScreenNavigationProp;
}

export default function NotFoundScreen({ navigation }: Props) {
  return (
    <LinearGradient
      colors={["#92e2dbff", "#FFECEC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/images/Logo.png")}
        />
        <Text style={styles.title}>Oops! Something went wrong!</Text>
        <Text style={styles.error}> Error 503</Text>
        <Text style={styles.message}>
          Trabajamos para estar disponible lo mas pronto posible. Estamos
          presentando problemas pero te notificaremos cuando estemos de nuevo
          disponibles
        </Text>
        <Text> Disculpanos de nuevo por las molestias....</Text>
        <View style={styles.footer}>
          <Text> ¿Tienes alguna duda?</Text>
          <TouchableOpacity>
            <Text style={styles.link}>Contactanos</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.inicio}
          onPress={() => navigation.navigate('Index')}
        >
          <Text style={styles.sign}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 8,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  error: {
    fontSize: 24,
    color: "#ca0000ff",
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  footer: {
    marginTop: 15,
    flexDirection: "row",
    gap: 10,
  },
  link: {
    color: "#000000ff",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  inicio: {
    backgroundColor: " rgba(0, 0, 0, 1)",
    padding: 10,
    width: 125,
    borderRadius: 9,
    marginTop: 30,
  },
  sign: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: "center",
  },
});