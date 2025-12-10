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
          name="index"
          options={{ headerShown: false, title: "index" }}
        />
        <Stack.Screen
          name="view/login/login"
          options={{ headerShown: false, title: "login" }}
        />
        <Stack.Screen
          name="register"
          options={{ headerShown: false, title: "register" }}
        />
        <Stack.Screen
          name="login-problem"
          options={{ headerShown: false, title: "login-problem" }}
        />
        <Stack.Screen
          name="notfound"
          options={{ headerShown: false, title: "notfound" }}
        />
        <Stack.Screen
          name="profile-booker"
          options={{ headerShown: false, title: "profile-Booker" }}
        />
        <Stack.Screen
          name="opinion-book"
          options={{ headerShown: false, title: "opinion-Book" }}
        />
        <Stack.Screen
          name="messaging"
          options={{ headerShown: false, title: "messaging" }}
        />
        <Stack.Screen
          name="add-book"
          options={{ headerShown: false, title: "add-Book" }}
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
