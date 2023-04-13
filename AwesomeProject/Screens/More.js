import * as React from 'react';
import { getAuth, signOut } from "firebase/auth";
import {
    StyleSheet,
    Text,
    View,
    Button,
    SafeAreaView,
    ScrollView,
    Animated,
    useWindowDimensions,
    TouchableOpacity,
    ImageBackground,
    Image,
    Alert,
  } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Logout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    Alert.alert("Sign-out Successfully");
    navigation.navigate("Home")
  }).catch((error) => {
  Alert.alert(error);
  });
};


export default function More({ navigation })
{
    return(
      <View>
    <TouchableOpacity onPress={() => navigation.navigate("About")}  >
    <Text style= {styles.button}>About</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => navigation.navigate("Login")}  >
    <Text style= {styles.button}>Login</Text>
    </TouchableOpacity> 

    <TouchableOpacity onPress={() => navigation.navigate("Register")}  >
    <Text style= {styles.button}>Register</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress = {Logout} >
    <Text style= {styles.button}>Logout</Text>
    </TouchableOpacity> 

    </View>

      
    );
}

const styles = StyleSheet.create({
  // style button to make it looks like a link
  button: {
    color : 'tomato',
    fontSize: 90,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine : 'underline',
    width : '100%',
  },
  hcontainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
    marginBottom: 130,
    opacity: 0,
  },

});
