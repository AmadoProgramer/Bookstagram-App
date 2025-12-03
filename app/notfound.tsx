import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

export default function NotFound() {
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
          presentando problemas pero te notificaremos cuando estemo de nuevo
          disponibles
        </Text>
        <Text> Disculpanos de nuevo por las molestias....</Text>
        <View style={styles.footer}>
            <Text> ¿Tienes alguna duda?</Text>
            <Link href="/" style={styles.link}>
          Contactanos
        </Link>
        </View>
         <TouchableOpacity style={styles.inicio}>
                          <Link href="/" style={styles.sign}>Volver al inicio</Link>
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
    marginBottom:40
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
  footer:{
    marginTop:15,
    flexDirection:"row",
    gap:10
  },
  link: {
    color: "#000000ff",
    fontWeight: "600",
    textDecorationLine:"underline"
  },
  inicio:{
    backgroundColor:" rgba(0, 0, 0, 1)",
    padding: 10,
    width: 125,
    borderRadius: 9,
    marginTop:30
  },
  sign:{
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf:"center"
  }
});
