import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Link } from "expo-router";


export default function Register() {
  return (
    <LinearGradient
      colors={["#92e2dbff", "#FFECEC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/images/Logo.png")}
        />
        <Text> WELCOME TO BOKOKSTAGRAM</Text>
      </View>
      <Text style={styles.Parrafo}>
        {" "}
        Hola tu Booker! Si es tu primera vez usando Bookstagram, registrate
        justo debajo en menos de 1 minuto 🧑🏻‍🏫📗📕
      </Text>
      <View style={styles.Formcontainer}>
        <Text style={styles.Name}> Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su Nombre"
          placeholderTextColor="#999"
        />
        <Text style={styles.Surname}> Apodo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su apodo"
          placeholderTextColor="#999"
        />
        <Text style={styles.email}> Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo"
          placeholderTextColor="#999"
        />
        <Text style={styles.postalcode}> Codigo Postal</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.inicio}>
          <Link href="/Login" style={styles.sign}>
            Registrarse
          </Link>
        </TouchableOpacity>
        <View style={styles.footer}> 
          <Text>Esta registrado ?</Text>
            <TouchableOpacity style={styles.loguear}>
              <Link href={"/Login"} style={styles.login}>
              Login
              </Link>
            </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    width: 230,
  },
  Parrafo: {
    padding: 8,
    width: 350,
  },
  Formcontainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 30,
    gap: 15,
    marginTop: 15,
    marginBottom:40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  input: {
    width: 250,
    borderColor: "#cfceceff",
    borderWidth: 1,
    borderRadius: 9,
  },
  Name: {
    width: 200,
  },
  Surname: {
    width: 200,
  },
  email: {
    width: 200,
  },
  postalcode: {
    width: 200,
  },
  inicio: {
    backgroundColor: " rgba(0, 0, 0, 1)",
    padding: 10,
    width: 125,
    borderRadius: 9,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  sign: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginEnd: 10,
    alignSelf: "center",
  },
  footer:{
    flexDirection:"row",
    gap:10,
    marginTop:5

  },
  loguear:{
    backgroundColor:"#9999",
    width:60,
    borderColor: "#05050599",
    borderWidth:3,
    borderRadius:8
  },
  login:{
    alignSelf:"center"
  }
});
