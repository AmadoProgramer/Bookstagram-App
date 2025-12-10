import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, Href, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import useViewModel from "./Viewmodel"
import { CustomTextInput } from "@/components/customTextInpunt";
import { RoundedButton } from "../register/roundedButton";
import { useApi } from '@/Hook/Useapi';
import { authService } from '@/services/authService';


export default function Login() {
  const router = useRouter();
  const { email, password, onChange } = useViewModel();
  
  const loginMutation = useApi(authService.login, {
    onSuccess: (data) => {
      console.log('Login exitoso:', data.user);
      router.replace('/'); // Redirigir al inicio
    },
    onError: (error) => {
      console.error('Error en login:', error);
      // Mostrar alerta al usuario
    },
  });
   const handleLogin = async () => {
    try {
      await loginMutation.execute({ email, password });
    } catch (error) {
      // Error ya manejado en onError
    }
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
          source={require("@/assets/images/Logo.png")}
        />
        <View style={styles.Formcontainer}>
          <Text style={styles.email}> Email</Text>
          <CustomTextInput
                                   placeholder='Correo Electrónico'
                                   keyboardType='email-address'
                                   property='email'
                                   onChangeText={onChange}
                                   value={email}
                                 />

          <Text> Password</Text>
            <CustomTextInput
                                  placeholder='Contraseña'
                                   keyboardType='default'
                                   property='password'
                                   onChangeText={onChange}
                                   value={password}
                                   secureTextEntry={true}        
          />
          <TouchableOpacity style={styles.inicio}  onPress={handleLogin}
      disabled={loginMutation.loading}>
            <RoundedButton text= {loginMutation.loading ? 'Cargando...' : 'Iniciar sesión'} onPress={handleLogin} />
          </TouchableOpacity>
          <Text style={styles.or}> or</Text>
          <TouchableOpacity style={styles.google}>
            <Text style={styles.signGoogle}> Iniciar con Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Apple}>
            <Text style={styles.signApple}> Continuar con Apple</Text>
          </TouchableOpacity>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Link href={`view/register/Register` as Href}>
                <Text style={styles.linkText}>Forgot password?</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  email: {
    width: 200,
  },
  input: {
    width: 250,
    borderColor: "#cfceceff",
    borderWidth: 1,
    borderRadius: 9,
  },
  inicio: {
    backgroundColor: " rgba(0, 0, 0, 1)",
    padding: 10,
    width: 125,
    borderRadius: 9,
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    left: 65,
  },
  sign: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginEnd: 10,
    alignSelf: "center",
  },
  or: {
    textAlign: "center",
  },
  google: {
    backgroundColor: "#dbd8d8ff",
    borderColor: "#999",
    padding: 10,
    width: 175,
    borderRadius: 9,
    alignContent: "center",
    justifyContent: "center",
    left: 38,
  },
  signGoogle: {
    alignSelf: "center",
  },
  Apple: {
    backgroundColor: "#000000ff",
    borderColor: "#999",
    padding: 10,
    width: 185,
    borderRadius: 9,
    alignContent: "center",
    justifyContent: "center",
    left: 31,
  },
  signApple: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
    gap: 6,
  },
  linkText: {
    color: "#666",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  loginButtonText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#999",
    fontSize: 12,
  },
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
});
