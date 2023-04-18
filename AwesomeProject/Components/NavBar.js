import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import {
  View,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const stack = createNativeStackNavigator();



//screens import 
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import About from '../Screens/About';
import More from '../Screens/More';
import Cart from '../Screens/Cart';
import Profile from '../Screens/Profile';
import Product from '../Screens/Product';

const Tab = createBottomTabNavigator();

const homeName = "Home";
const loginName = "Login";
const registerName = "Register";
const aboutName = "About";
const moreName = "More";
const cartName = "Cart";
const profileName = "Profile";
const productName = "Products";


function NavBar() 
{
  const [State, setState] = useState(false);


onAuthStateChanged(auth, (user) => {
    if (user) {
      setState(true);
      const uid = user.uid;
    } else {
      setState(false);
    }
  });


    return (

      

        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
    
                if (rn === homeName) {
                  iconName = focused ? 'home' : 'home-outline';
    
                } else if (rn === loginName) {
                  iconName = focused ? 'log-in' : 'log-in-outline';
    
                }
                else if (rn === registerName) {
                    iconName = focused ? 'person-add' : 'person-add-outline';
                }
                // else if (rn === aboutName) {
                //     iconName = focused ? 'information-circle' : 'information-circle-outline';
                // }
                else if (rn === moreName) {
                    iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
                }
                else if (rn === cartName) {
                    iconName = focused ? 'cart' : 'cart-outline';
                }
                else if (rn === profileName) {
                    iconName = focused ? 'person' : 'person-outline';
                }

                else if (rn === productName) {
                  // add all products icons hereshopping-bag

                  iconName = focused ? 'grid' : 'grid-outline';
                }
                
    
                // return components
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
                activeTintColor: '#539165',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70}
              }}
              >

                <Tab.Screen name={homeName} component={Home} />
                <Tab.Screen name={productName} component={Product} />

                {State == true ? (
                <Tab.Screen name={profileName} component={Profile} />
                  ) : (

                <Tab.Screen name={loginName} component={Login} />
                )}

                {State == true ? (
                <Tab.Screen name={cartName} component={Cart} />
                  ) : (
                <Tab.Screen name={registerName} component={Register}/>
                )}

            <Tab.Screen name={moreName} component={More} />
            
            </Tab.Navigator>

            
        </NavigationContainer>
        

    );
}

export default NavBar;
