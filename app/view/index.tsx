import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../../components/navbar";
import { useState } from "react";
import { Link, Href } from "expo-router";

export default function Index() {
  const [rating, setRating] = useState(0);

  return (
    <LinearGradient colors={["#92e2dbff", "#FFECEC"]} style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Navbar />
      </View>
      <View style={styles.body}>
        <View style={styles.headerform}>
          <Link href={`opinion-book` as Href}>
          <Image
            style={styles.user}
            source={require("@/assets/images/Captura de pantalla 2025-11-19 a la(s) 5.05.03 p.m. 1.png")}
          />
          </Link>
          <Text style={styles.username}>Jose_ </Text>
        </View>
        <Image
          style={styles.publicacion}
          source={require("@/assets/images/image 1.png")}
        />
        <Text> Alas de sangre: Book I </Text>
        <View style={styles.etiqueta}>
          <Text> Fantasy and Action</Text>
          <LinearGradient
            colors={["#ec0f0fff", "#747272ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text> BestSeller</Text>
          </LinearGradient>
        </View>
        <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={styles.star}>{star <= rating ? "★" : "☆"}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text> Alas de sangre trata sobre Violet sorrengail, quien a pesar de su debilidad fisica,
           es obligada por su madre a ingresar en la academia militar de jinetes de dragones en basglath
          </Text>
          <Text style={styles.idioma}> Español</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text style={styles.strellas}>{star <= rating ? "★" : "☆"}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.idioma}> Muy bueno</Text>
          <Text style={styles.idioma}>Puntuacion General: 80% Recepcion</Text>
          <Text style={styles.lenguaje}> L A N G U A G E : S P A N I S H</Text>
          <Text style={styles.idioma}> Y e a r : 2 0 2 2</Text>
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
  header: {
    width: 200,
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
  },
  headerform: {
    gap: 15,
    flexDirection: "row",
  },
  user: {
    width: 40,
    height: 40,
  },
  username: {
    fontSize: 22,
    color: "#b5eeebff",
  },
  publicacion: {
    width: 300,
    alignSelf: "center",
  },
  etiqueta: {
    gap: 5,
    flexDirection: "row",
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
  idioma:{
    fontWeight:"bold",
    fontSize:18
  }, strellas:{
     fontSize: 22,
    color: "#202020ff",
    marginHorizontal: 2,
  },
  lenguaje:{
    color:"#9999",
    fontSize: 18
  }
});
