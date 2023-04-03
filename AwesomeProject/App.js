import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Register';
import About from './Screens/About';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Signup}  options={{title:'Signup'}}/>
      <Stack.Screen name="About" component={About} />
      {/* <Stack.Screen name="About" component={About} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="About" component={About} /> */}
    
    </Stack.Navigator>
  </NavigationContainer>
  );
}


