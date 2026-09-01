import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../AppNavigator';
import { LinearGradient } from "expo-linear-gradient";
import { CustomTextInput } from "../../components/customTextInpunt";
import { useApi } from "../../Hook/Useapi";
import { authService } from "../../services/authService";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: Props) {
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerMutation = useApi(authService.register, {
    onSuccess: (data) => {
      console.log('✅ Registro exitoso:', data.user);
      Alert.alert(
        '¡Registro exitoso!', 
        `Bienvenido ${data.user.name}`,
        [
          { 
            text: 'OK', 
            onPress: () => navigation.replace('Index')
          }
        ]
      );
    },
    onError: (error: any) => {
      console.error('❌ Error en registro:', error);
      Alert.alert(
        'Error al registrarse', 
        error.message || 'Intenta de nuevo'
      );
    },
  });

  const onChange = (property: string, value: any) => {
    switch (property) {
      case 'nombre':
        setNombre(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
  };

  const handleRegister = async () => {
    // Validaciones
    if (!nombre || !username || !email || !password || !confirmPassword) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Email inválido', 'Por favor ingresa un email válido');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    console.log('🔄 Intentando registro con:', { nombre, username, email });

    try {
      await registerMutation.execute({
        nombre,
        username,
        email,
        password,
      });
    } catch (error) {
      // Error ya manejado en onError
    }
  };

  return (
    <LinearGradient
      colors={["#92e2dbff", "#FFECEC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>WELCOME TO BOOKSTAGRAM</Text>
        </View>
        
        <Text style={styles.Parrafo}>
          Hola tu Booker! Si es tu primera vez usando Bookstagram, regístrate
          justo debajo en menos de 1 minuto 🧑🏻‍🏫📗📕
        </Text>
        
        <View style={styles.Formcontainer}>
          <Text style={styles.label}>Nombre completo</Text>
          <CustomTextInput
            placeholder="Nombre completo"
            keyboardType="default"
            property="nombre"
            onChangeText={onChange}
            value={nombre}
          />
          
          <Text style={styles.label}>Nombre de usuario</Text>
          <CustomTextInput
            placeholder="Username"
            keyboardType="default"
            property="username"
            onChangeText={onChange}
            value={username}
          />
          
          <Text style={styles.label}>Email</Text>
          <CustomTextInput
            placeholder="Correo electrónico"
            keyboardType="email-address"
            property="email"
            onChangeText={onChange}
            value={email}
          />
          
          <Text style={styles.label}>Contraseña</Text>
          <CustomTextInput
            placeholder="Contraseña (mín. 6 caracteres)"
            keyboardType="default"
            property="password"
            onChangeText={onChange}
            value={password}
            secureTextEntry={true}
          />
          
          <Text style={styles.label}>Confirmar contraseña</Text>
          <CustomTextInput
            placeholder="Confirma tu contraseña"
            keyboardType="default"
            property="confirmPassword"
            onChangeText={onChange}
            value={confirmPassword}
            secureTextEntry={true}
          />
          
          <TouchableOpacity 
            style={[styles.inicio, registerMutation.loading && styles.inicioDisabled]}
            onPress={handleRegister}
            disabled={registerMutation.loading}
          >
            {registerMutation.loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>CONFIRMAR</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text>¿Ya estás registrado?</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.login}>Iniciar Sesión</Text>
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
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Parrafo: {
    padding: 8,
    maxWidth: 350,
    textAlign: 'center',
    marginBottom: 20,
  },
  Formcontainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    width: '100%',
    maxWidth: 400,
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
    marginTop: 20,
    alignItems: 'center',
  },
  inicioDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: '#007AFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});