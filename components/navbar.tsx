import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import Menu from "./menu";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Navbar() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('Index')}>
        <Image
          style={styles.logo}
          source={require("../assets/images/Logo.png")}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder=" Search"
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={() => navigation.navigate('Messaging')}>
        <Image
          style={styles.logo}
          source={require("../assets/images/Send.png")}
        />
      </TouchableOpacity>
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
});