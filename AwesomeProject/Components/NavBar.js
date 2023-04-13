import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens import 
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import About from '../Screens/About';
import More from '../Screens/More';

const Tab = createBottomTabNavigator();

const homeName = "Home";
const loginName = "Login";
const registerName = "Register";
const aboutName = "About";
const moreName = "More";

const auth = getAuth();

function NavBar() 
{
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
                else if (rn === aboutName) {
                    iconName = focused ? 'information-circle' : 'information-circle-outline';
                }
                else if (rn === moreName) {
                    iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
                }
                
    
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70}
              }}
              >

            <Tab.Screen name={homeName} component={Home} />
            <Tab.Screen name={loginName} component={Login} />
            <Tab.Screen name={registerName} component={Register} />
            <Tab.Screen name={aboutName} component={About} />
            <Tab.Screen name={moreName} component={More} />
            </Tab.Navigator>
        </NavigationContainer>
        

    );
}

export default NavBar;
