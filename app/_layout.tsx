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
        <Stack.Screen
          name="login"
          options={{ headerShown: false, title: "" }}
        />
        
      </Stack>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
