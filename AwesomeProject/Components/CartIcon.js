import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CartContext } from "../CartContext";

export function CartIcon({ navigation }) {
  const { getItemsCount } = useContext(CartContext);
  return (
    <View style={{ marginLeft: 20, marginTop: -25 }}>
      <Text
        style={{
          backgroundColor: "red",
          borderRadius: 50,
          color: "#fff",
          fontSize: 12,
          paddingHorizontal: 3,
        }}
      >
        {getItemsCount()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: "#00a46c",
    height: 39,
    padding: 12,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});
