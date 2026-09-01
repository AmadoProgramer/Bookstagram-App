import React from "react";
import { StyleSheet, View, TextInput, KeyboardType } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  keyboardType: KeyboardType;
  secureTextEntry?: boolean;
  property: string;
  onChangeText: (property: string, value: any) => void;
}

export const CustomTextInput = ({
  placeholder,
  value,
  keyboardType,
  secureTextEntry = false,
  property,
  onChangeText,
}: Props) => {
  return (
    <View style={styles.formInput}>
      <TextInput
        style={styles.formTextInput}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => onChangeText(property, text)}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  formInput: {
    flexDirection: "row",
    width: 250,
    borderColor: "#c2c0c0ff",
    borderWidth: 1,
    borderRadius: 9
  },
  formTextInput: {
    flex: 1
  },
});
