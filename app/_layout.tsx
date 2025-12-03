import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <LinearGradient
      colors={["#7af3e9ff", "#FFECEC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Stack>
        <Stack.Screen name="Login" options={{ title: "" }} />
        <Stack.Screen name="index" options={{ title: "" }} />
        <Stack.Screen name="Register" options={{ title: "" }} />
        <Stack.Screen name="notfound" options={{ title: "" }} />
      </Stack>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
