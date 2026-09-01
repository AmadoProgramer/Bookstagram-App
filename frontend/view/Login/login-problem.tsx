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
import { LinearGradient } from 'expo-linear-gradient';

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
       source={{
                  uri: "data:image/jpeg;base64,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",
                }}
              />
      <Image
        style={styles.account}
        source={{
                  uri: "data:image/jpeg;base64,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",
                }}
              
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