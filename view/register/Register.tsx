import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';
import LinearGradient from "react-native-linear-gradient";
import { CustomTextInput } from "../../components/customTextInpunt";
import { RoundedButton } from "./roundedButton";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChange = (property: string, value: any) => {
    switch (property) {
      case 'name':
        setName(value);
        break;
      case 'lastname':
        setLastname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'postalcode':
        setPostalcode(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
  };

  const register = () => {
    console.log(JSON.stringify({ name, lastname, email, postalcode, password, confirmPassword }));
    // Aquí iría la lógica de registro
  };

  return (
    <LinearGradient
      colors={["#92e2dbff", "#FFECEC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/images/Logo.png")}
          />
          <Text> WELCOME TO BOOKSTAGRAM</Text>
        </View>
        <Text style={styles.Parrafo}>
          Hola tu Booker! Si es tu primera vez usando Bookstagram, registrate
          justo debajo en menos de 1 minuto 🧑🏻‍🏫📗📕
        </Text>
        <View style={styles.Formcontainer}>
          <Text style={styles.Name}>Nombre</Text>
          <CustomTextInput
            placeholder=" Nombre"
            keyboardType="default"
            property="name"
            onChangeText={onChange}
            value={name}
          />
          <Text style={styles.Surname}>Apodo</Text>
          <CustomTextInput
            placeholder=" Apodo"
            keyboardType="default"
            property="lastname"
            onChangeText={onChange}
            value={lastname}
          />
          <Text style={styles.email}>Email</Text>
          <CustomTextInput
            placeholder=" Ingrese su correo"
            keyboardType="email-address"
            property="email"
            onChangeText={onChange}
            value={email}
          />
          <Text style={styles.postalcode}>Contraseña</Text>
          <CustomTextInput
            placeholder=" Ingrese su contraseña"
            keyboardType="default"
            property="password"
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
          />
          <Text style={styles.postalcode}>Confirmar contraseña</Text>
          <CustomTextInput
            placeholder=" Ingresela nuevamente"
            keyboardType="default"
            property="confirmPassword"
            onChangeText={onChange}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <Text style={styles.postalcode}>Codigo Postal</Text>
          <CustomTextInput
            placeholder=" Ingrese su codigo postal"
            keyboardType="default"
            property="postalcode"
            onChangeText={onChange}
            value={postalcode}
          />
          <TouchableOpacity style={styles.inicio}>
            <RoundedButton text="CONFIRMAR" onPress={register} />
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text>Esta registrado ?</Text>
            <TouchableOpacity 
              style={styles.loguear}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
  footer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  loguear: {
    backgroundColor: "#9999",
    width: 60,
    borderColor: "#05050599",
    borderWidth: 3,
    borderRadius: 8,
  },
  login: {
    alignSelf: "center",
  },
});