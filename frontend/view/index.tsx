import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/navbar";
import { authService } from "../services/authService";
import { User } from "../services/auth";

type IndexScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Index'>;

interface Props {
  navigation: IndexScreenNavigationProp;
}

export default function IndexScreen({ navigation }: Props) {
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario al entrar
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        console.log('👤 Usuario cargado:', currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        // Si no hay usuario, redirigir al login
        navigation.replace('Login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={["#92e2dbff", "#FFECEC"]} style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#92e2dbff", "#FFECEC"]} style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Navbar />
        </View>
        <View style={styles.body}>
          <View style={styles.headerform}>
            <TouchableOpacity onPress={() => navigation.navigate('OpinionBook')}>
              <Image
                style={styles.user}
                source={{ 
                  uri: user?.avatar_url || 'https://via.placeholder.com/40/92e2db/000000?text=U'
                }}
              />
            </TouchableOpacity>
            <Text style={styles.username}>@{user?.username || 'Usuario'}</Text>
          </View>
          <Image
            style={styles.publicacion}
            source={{ uri: 'https://via.placeholder.com/300x400/92e2db/000000?text=Book+Cover' }}
          />
          <Text style={styles.bookTitle}>Alas de sangre: Book I</Text>
          <View style={styles.etiqueta}>
            <Text style={styles.genreText}>Fantasy and Action</Text>
            <LinearGradient
              colors={["#ec0f0fff", "#747272ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.bestsellerBadge}
            >
              <Text style={styles.bestsellerText}>BestSeller</Text>
            </LinearGradient>
          </View>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={styles.star}>{star <= rating ? "★" : "☆"}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.description}>
            Alas de sangre trata sobre Violet Sorrengail, quien a pesar de su debilidad física,
            es obligada por su madre a ingresar en la academia militar de jinetes de dragones en Basgiath.
          </Text>
          <Text style={styles.idioma}>Español</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={styles.strellas}>{star <= rating ? "★" : "☆"}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.idioma}>Muy bueno</Text>
          <Text style={styles.idioma}>Puntuación General: 80% Recepción</Text>
          <Text style={styles.lenguaje}>L A N G U A G E : S P A N I S H</Text>
          <Text style={styles.idioma}>Y e a r : 2 0 2 2</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  header: {
    width: '100%',
    marginBottom: 40,
  },
  body: {
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
  headerform: {
    gap: 15,
    flexDirection: "row",
    alignItems: 'center',
  },
  user: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 18,
    color: "#333",
    fontWeight: '600',
  },
  publicacion: {
    width: '100%',
    height: 400,
    alignSelf: "center",
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  etiqueta: {
    gap: 10,
    flexDirection: "row",
    alignItems: 'center',
  },
  genreText: {
    fontSize: 14,
    color: '#666',
  },
  bestsellerBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  bestsellerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stars: {
    flexDirection: "row",
    marginTop: 5,
  },
  star: {
    fontSize: 22,
    color: "#d12d27ff",
    marginHorizontal: 2,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  idioma: {
    fontWeight: "bold",
    fontSize: 16,
  },
  strellas: {
    fontSize: 22,
    color: "#202020ff",
    marginHorizontal: 2,
  },
  lenguaje: {
    color: "#9999",
    fontSize: 14,
  },
});