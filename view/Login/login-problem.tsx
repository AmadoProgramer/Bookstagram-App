import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';
import LinearGradient from "react-native-linear-gradient";

type LoginProblemScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginProblem'>;

interface Props {
  navigation: LoginProblemScreenNavigationProp;
}

export default function LoginProblemScreen({ navigation }: Props) {
  const [code, setCode] = useState("");

  return (
    <LinearGradient
      colors={["#92e2dbff", "#FFECEC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        style={styles.logo}
        source={require("../assets/images/Logo.png")}
      />
      <Image
        style={styles.account}
        source={require("../assets/images/account_circle.png")}
      />
      <Text style={styles.Title}>¿Problemas para loguearte?</Text>
      <Text style={styles.parrafo}>
        Te hemos enviado un codigo al correo XXXXXXXX@gmail para realizar la
        recuperacion de tu contraseña. Digita el codigo a continuacion
      </Text>
      <View style={styles.form}>
        <Text>Numero de codigo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su codigo de verificacion"
          placeholderTextColor="#999"
          value={code}
          onChangeText={setCode}
        />
        <TouchableOpacity 
          style={styles.inicio}
          onPress={() => console.log("Enviar codigo", code)}
        >
          <Text style={styles.sign}>Enviar Codigo</Text>
        </TouchableOpacity>
        <Text style={styles.coding}>¿No recibiste aun el codigo?</Text>
        <TouchableOpacity style={styles.reenviar}>
          <Text style={styles.codigo}>Reenviar Codigo</Text>
        </TouchableOpacity>
        <View style={styles.footerLinks}>
          <Text style={styles.help}>Necesitas ayuda?</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>Escribenos!</Text>
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
    width: 70,
    height: 70,
    marginBottom: 16,
  },
  account: {
    width: 70,
    height: 70,
    marginBottom: 16,
    marginTop: 10,
  },
  Title: {
    fontSize: 22,
    color: "#000000ff",
    fontWeight: "bold",
  },
  parrafo: {
    marginBottom: 15,
    marginTop: 13,
    alignSelf: "center",
    width: 340,
    height: 100,
    padding: 4,
    fontSize: 16,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "#9999",
    borderWidth: 2,
    padding: 30,
    gap: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  input: {
    borderColor: "#cfceceff",
    borderWidth: 1,
    borderRadius: 9,
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  inicio: {
    backgroundColor: " rgba(0, 0, 0, 1)",
    padding: 10,
    width: 150,
    borderRadius: 9,
    marginTop: 20,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  sign: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: "center",
  },
  coding: {
    marginTop: 30,
    alignSelf: "flex-start",
  },
  reenviar: {
    backgroundColor: " rgba(128, 206, 161, 1)",
    padding: 10,
    width: 150,
    borderRadius: 9,
    marginTop: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  codigo: {
    color: '#000000ff',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: "center",
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
    gap: 6,
  },
  linkText: {
    color: '#000000ff',
    fontSize: 14,
    fontWeight: "bold",
  },
  help: {
    color: '#666',
    fontSize: 14,
  },
});