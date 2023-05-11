import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Search from "../Components/Search";
function HeaderAboutLogo() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          style={styles.logo}
          source={require("../assets/IMG-20230501-WA0067.jpg.png")}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    width: "35%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    marginRight: -130,
    alignItems: "center",

    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    alignItems: "center",
    marginLeft: 33,
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default HeaderAboutLogo;
