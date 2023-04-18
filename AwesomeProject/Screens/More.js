import * as React from 'react';
import { useState,useEffect} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth ,db } from "../firebase";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
  } from "react-native";

  import About from "../Screens/About";
  import { useNavigation } from '@react-navigation/native';
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




export default function More({navigation})

{


  
  const [State, setState] = useState(false);

  const listen=onAuthStateChanged(auth,(user)=>{
    if(user){
        setState(true);
    }else{  
        setState(false);
    }
});

  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };


    return(
      <View>

    <TouchableOpacity onPress={() => navigation.navigate("About")} >
    <Text style= {styles.button}>About</Text>
    </TouchableOpacity>
    {State == true ? (
          <TouchableOpacity onPress = {logOut} >
          <Text style= {styles.button}>Logout</Text>
          </TouchableOpacity>
        ) : (
          <View>
           
          </View>
        )}
    


    </View>
    );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',

    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    color : '#539165',
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
    marginTop : 30,
    marginBottom : 30,
    marginLeft : 30,
    marginRight : 30,
    borderColor: 'grey',
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
