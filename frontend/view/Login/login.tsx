import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import { CustomTextInput } from '../../components/customTextInpunt';
import { useApi } from '../../Hook/Useapi';
import { authService } from '../../services/authService';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginMutation = useApi(authService.login, {
    onSuccess: (data) => {
      console.log('✅ Login exitoso:', data.user);
      Alert.alert('¡Bienvenido!', `Hola ${data.user.email}`, [
        { 
          text: 'OK', 
          onPress: () => navigation.replace('Index')
        }
      ]);
    },
    onError: (error: any) => {
      console.error('❌ Error en login:', error);
      Alert.alert(
        'Error al iniciar sesión', 
        error.message || 'Verifica tus credenciales e intenta de nuevo'
      );
    },
  });

  const handleLogin = async () => {
    // Validaciones
    if (!email || !password) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Email inválido', 'Por favor ingresa un email válido');
      return;
    }

    console.log('🔄 Intentando login con:', { email });
    
    try {
      await loginMutation.execute({ email, password });
    } catch (error) {
      // Error ya manejado en onError
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
          source={{ uri: 'https://via.placeholder.com/168x149/92e2db/000000?text=Logo' }}
        />
        
        <View style={styles.Formcontainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          
          <Text style={styles.label}>Email</Text>
          <CustomTextInput
            placeholder='Correo Electrónico'
            keyboardType='email-address'
            property='email'
            onChangeText={onChange}
            value={email}
          />

          <Text style={styles.label}>Contraseña</Text>
          <CustomTextInput
            placeholder='Contraseña'
            keyboardType='default'
            property='password'
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
          />

          <TouchableOpacity 
            style={[styles.inicio, loginMutation.loading && styles.inicioDisabled]} 
            onPress={handleLogin}
            disabled={loginMutation.loading}
          >
            {loginMutation.loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.sign}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.or}>o</Text>

          <TouchableOpacity style={styles.google}>
            <Text style={styles.signGoogle}>Iniciar con Google</Text>
          </TouchableOpacity>

          <View style={styles.footerLinks}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => navigation.navigate('LoginProblem')}
            >
              <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>
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
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  inicio: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 9,
    marginTop: 10,
    alignItems: 'center',
  },
  inicioDisabled: {
    opacity: 0.6,
  },
  sign: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  or: {
    textAlign: "center",
    fontSize: 14,
    color: '#666',
  },
  google: {
    backgroundColor: "#dbd8d8ff",
    padding: 15,
    borderRadius: 9,
    alignItems: 'center',
  },
  signGoogle: {
    fontSize: 14,
    fontWeight: '600',
  },
  footerLinks: {
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});