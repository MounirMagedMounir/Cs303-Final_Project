import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View ,Button} from "react-native";

export default function Register({navigation}) {
  return (
    <View style={styles.container}>
    
      <Button
        onPress={() => navigation.navigate("Home")}
        title=" Home"
        color="#2196F3"
        accessibilityLabel="Home"
      />
      <Button
        onPress={() => navigation.navigate("Login")}
        title=" log in"
        color="#2196F3"
        accessibilityLabel="log in"
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
