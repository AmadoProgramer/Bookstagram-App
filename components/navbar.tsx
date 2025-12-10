import { View, TextInput, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Link, Href} from "expo-router";
import Menu from "./menu";
export default function Navbar() {
  return (
    <View style={styles.header}>
      <Link href={"/"}>
        <Image
          style={styles.logo}
          source={require("../assets/images/Logo.png")}
        />
      </Link>
      <TextInput
        style={styles.input}
        placeholder=" Search"
        placeholderTextColor="#999"
      />
      < Link href={`messaging` as Href}>
        <Image
          style={styles.logo}
          source={require("../assets/images/Send.png")}
        />
      </Link>
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginTop: 6,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "#000000ff",
    borderWidth: 1,
    borderRadius: 16,
  },
  send: {
    width: 30,
    height: 30,
    marginTop: 6,
  },
});
