import { StyleSheet, View, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

export default function Index() {
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
        <TextInput
          style={styles.input}
          placeholder=" Search"
          placeholderTextColor="#999"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    gap: 9,
  },
  logo: {
    width: 50,
    height: 50,
  },
  input:{
     width: 180,
    borderColor: "#cfceceff",
    borderWidth: 1,
    borderRadius:9
  }
});
