import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Alert } from 'react-native';
import backgroundImage from '../assets/fbackground.jpg';
import image from '../assets/home.png';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sendPasswordResetEmail } from 'firebase/auth';


export default function Login({ navigation }) {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[Icon,SetIcon]=useState('eye-off-outline');
  const[bool,Setbool]=useState(true);

  const auth = getAuth()
  
  const ChangeIcon=()=>{
    if (Icon==='eye-off-outline') {
      SetIcon('eye-outline')
      Setbool(false)
    }
   else  {
    SetIcon('eye-off-outline')
    Setbool(true)
    
  }
  }

  const handleResetPassword = () => {
    if (Email) {
      sendPasswordResetEmail(auth,Email)
        .then(() => {
          Alert.alert("Password reset email sent.");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert(errorMessage);
        });
    } else {
      Alert.alert("Please enter your email address to reset your password.");
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, Email, password)
      .then((userCredential) => {
        Alert.alert("Sign-in Successfully");
        navigation.navigate("Home")
        const user = userCredential.user;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      })
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView behavior="hight" style={styles.container}>
      
        <View style={styles.hcontainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Image
              source={image}
              style={{ width: 50, height: 50, marginBottom: 155 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="                      Email"
            value={Email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="                    Password"
            secureTextEntry={bool}
            value={password}
            onChangeText={setPassword}
          />
          <View>
          <Ionicons name="ios-lock-closed-outline" size={17} color="#666" style={{ marginTop: -55, marginLeft: -100 }} />
          <Ionicons name="mail-outline" size={17} color="#666" style={{ marginTop: -92, marginLeft: -100 }} />
          </View>
          <Ionicons name={Icon} size={19} color="#666" style={{marginTop:-55,marginBottom:40,marginRight:-180}} onPress={ChangeIcon}></Ionicons>
          
          <TouchableOpacity style={styles.buttonn} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row"}}>
          <Text style={styles.link}>You Don't Have An Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link0}>Register</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleResetPassword}>
            <Text style={styles.link1}>Forget Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 425,
  },

  hcontainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
    marginBottom: 130,
    opacity: 0,
  },
  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop:-20,
    marginBottom:-20,
  },
  input: {
    width: '60%',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: '#FE3539',
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
    marginBottom: 160,
    marginLeft: 274,
    fontSize: 10,

  },
  link: {
    fontWeight:700,
  },
  link1: {
    fontWeight:700,
    marginTop:10,
  },
  link0: {
    textDecorationLine: 'underline',
    fontWeight:700,
    marginLeft:10,
  },
  buttonn: {
    width: '60%',
    backgroundColor: '#FE3539',
    padding: 10,
    borderRadius: 50,
    marginTop:-11,
    marginLeft: 0,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    backgroundColor: '#fff',
  },
});