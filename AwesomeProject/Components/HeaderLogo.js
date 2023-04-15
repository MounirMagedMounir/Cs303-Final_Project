import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  navigation,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function HeaderAboutLogo({}) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        //backgroundColor: "#19376D",
      }}
    >
      <Text
        style={{
          color: "black",
          padding: 1,
          fontSize: 20,
          fontWeight: "bold",
          marginRight: -1,
          marginLeft: -20,
        }}
      >
        About
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image style={styles.imglogo1} source={require("../assets/R.png")} />
      </TouchableOpacity>
    </View>
  );
}
export default HeaderAboutLogo;
const styles = StyleSheet.create({
  imglogo1: {
    width: 30,
    height: 30,
    marginRight: -5,
    //marginLeft: 10,
    resizeMode: "contain",
  },
});
