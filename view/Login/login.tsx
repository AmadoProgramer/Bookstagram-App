import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import { Image } from 'react-native';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

// Importa tus hooks y componentes
import { CustomTextInput } from '../../components/customTextInpunt';
import { useApi } from '../../Hook/Useapi';
import { authService } from '../../services/authService';

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginMutation = useApi(authService.login, {
    onSuccess: (data) => {
      console.log('Login exitoso:', data.user);
      navigation.replace('Index');
    },
    onError: (error) => {
      console.error('Error en login:', error);
    },
  });

  const handleLogin = async () => {
    try {
      await loginMutation.execute({ email, password });
    } catch (error) {
      // Error ya manejado
    }
  };

  const onChange = (property: string, value: any) => {
    if (property === 'email') setEmail(value);
    if (property === 'password') setPassword(value);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#92e2dbff", "#FFECEC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />

      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../assets/images/Logo.png')}
        />
        <View style={styles.Formcontainer}>
          <Text style={styles.email}>Email</Text>
          <CustomTextInput
            placeholder='Correo Electrónico'
            keyboardType='email-address'
            property='email'
            onChangeText={onChange}
            value={email}
          />

          <Text>Password</Text>
          <CustomTextInput
            placeholder='Contraseña'
            keyboardType='default'
            property='password'
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
          />

          <TouchableOpacity 
            style={styles.inicio} 
            onPress={handleLogin}
            disabled={loginMutation.loading}
          >
            <Text style={styles.sign}>
              {loginMutation.loading ? 'Cargando...' : 'Iniciar sesión'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.or}>or</Text>

          <TouchableOpacity style={styles.google}>
            <Text style={styles.signGoogle}>Iniciar con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.footerLinks}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  logo: {
    width: 168,
    height: 149,
    marginBottom: 16,
  },
  Formcontainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  email: {
    width: 200,
  },
  inicio: {
    backgroundColor: "#000000",
    padding: 10,
    width: 125,
    borderRadius: 9,
    marginTop: 10,
    alignSelf: "center",
  },
  sign: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  or: {
    textAlign: "center",
  },
  google: {
    backgroundColor: "#dbd8d8ff",
    padding: 10,
    width: 175,
    borderRadius: 9,
    alignSelf: "center",
  },
  signGoogle: {
    textAlign: "center",
  },
  footerLinks: {
    marginTop: 10,
  },
  linkText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});