import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View ,Button} from "react-native";

export default function Login({navigation}) {
  return (
    <View style={styles.container}>
    
      <Button
        onPress={() => navigation.navigate("Home")}
        title=" Home"
        color="#2196F3"
        accessibilityLabel="Home"
      />
     
      <Button
        onPress={() => navigation.navigate("Register")}
        title=" Register "
        color="#38b000"
        accessibilityLabel="Register"
      />
      <Button
        onPress={() => navigation.navigate("About")}
        title=" About"
        color="#2196F3"
        accessibilityLabel="About"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
