import React from "react";
import {
  View,
  TextInput,
  SafeAreaView,RefreshControl,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import InputField from "../Components/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import Botton from "../Components/btn";
import Facebook from "../assets/facebook.png";
import Googlee from "../assets/google.png";
import Twitter from "../assets/twitter.png";
import TouchOpacity from "../Components/TouchOpacity";
import { auth, db } from "../firebase";
import { collection, addDoc, doc,setDoc  } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { Alert } from "react-native";
export default function Signup({ navigation }) {
   const [accessToken, SetAccessToken] = useState();
  const [userInfo, SetUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "248629810532-gae2c1d016o919dhta3kdgtojt9cegoq.apps.googleusercontent.com",
  });
  const [name, SetName] = useState("");
  const [phone, SetPhone] = useState("");
  const [day, SetDay] = useState("");
  const [month, SetMonth] = useState("");
  const [year, SetYear] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [confPassword, SetconfPassword] = useState("");
  const [Icon, SetIcon] = useState("eye-off-outline");
  const [Icon2, SetIcon2] = useState("eye-off-outline");
  const [bool, Setbool] = useState(true);
  const [bool2, Setbool2] = useState(true);


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  
  console.log(bool);
  const ChangeIcon = () => {
    if (Icon === "eye-off-outline") {
      SetIcon("eye-outline");
      Setbool(false);
    } else {
      SetIcon("eye-off-outline");
      Setbool(true);
    }
  };
  const ChangeIcon2 = () => {
    if (Icon2 === "eye-off-outline") {
      SetIcon2("eye-outline");
      Setbool2(false);
    } else {
      SetIcon2("eye-off-outline");
      Setbool2(true);
    }
  };
 
  const handleSignUp = async () => {
    if (name.trim().length < 2) {
      Alert.alert("please enter a name");
    } else {
      if (password === confPassword) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            await setDoc(doc(db, "users",auth.currentUser.uid), {
              email: email.toLowerCase().trim(),
              uid: user.uid,
              name: name.trim(),
              password: password.trim(),
              phone: phone.trim(),
              image:"https://res.cloudinary.com/zpune/image/upload/v1645429478/random/user_u3itjd.png",
              BirthDate:day+"/"+month+"/"+year
            });
            Alert.alert("done");
            navigation.navigate("Login");
          })

          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorMessage);
          });
      } else {
        Alert.alert("Password doesnot match");
      }
    }
  };

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    userInfoResponse.json().then((data) => {
      SetUserInfo(data);
    });
    let password = "1234567";
    await createUserWithEmailAndPassword(auth, userInfo.email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
         await setDoc(doc(db, "users",auth.currentUser.uid), {
          email: userInfo.email.toLowerCase().trim(),
          uid: user.uid,
          name: userInfo.name.trim(),
          password: password.trim(),
         day:day,
        Month:month,
         year:year,
          Card:[],
        });
        Alert.alert("done");
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  useEffect(() => {
    if (response?.type === "success") {
      SetAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView
    
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
    <SafeAreaView >
    <ScrollView showsVerticalScrollIndicator={false}>
    <ImageBackground source={require('../assets/pexels-photo-8450256.webp')} size="lg" alt='logo' w="full" resizeMode="cover" >
    <View style={{marginTop:35,marginLeft:"20%",marginRight:"20%"}}>
    <Text style={{textAlign:"center",fontSize:30,color:'#539165',fontWeight:"bold",marginBottom:20}}>Register</Text>
    <InputField  label={'Full name'}  value={name} onChangeText={SetName} />
    <Ionicons name="person-circle-outline"size={17} color="#539165" style={styles.icons} /> 
    <InputField  label={'Email'}   keyboardType="email-address" value={email} onChangeText={SetEmail} />
    <Ionicons name="mail-outline"size={17} color="#539165" style={styles.icons} />
  
    <InputField icon={<Ionicons name={Icon} size={19} color="#666" style={{marginTop:20,marginLeft:-30}} onPress={ChangeIcon}></Ionicons>} label={'Password'}  inputType="password" value={password} onChangeText={SetPassword} r={bool} />
    <Ionicons name='ios-lock-closed-outline' size={17} color="#539165" style={styles.icons} /> 
    {/* icon={<Ionicons name={Icon} size={19} color="#666" style={{marginTop:-90,marginBottom:100,marginLeft:190}} onPress={ChangeIcon}></Ionicons>
    } */}
    <InputField icon={<Ionicons name={Icon2} size={19} color="#666" style={{marginTop:20,marginLeft:-30}} onPress={ChangeIcon2}></Ionicons> } label={'Confirm password'}  inputType="password"  value={confPassword} onChangeText={SetconfPassword} r={bool2}/>
    {/* <Ionicons name={Icon2} size={19} color="#666" style={{marginTop:-90,marginBottom:60,marginLeft:190}} onPress={ChangeIcon2}></Ionicons> */}
    <Ionicons name='ios-lock-closed-outline' size={17} color="#539165" style={styles.icons} /> 
    <InputField   label={'Phone'}  keyboardType='numeric'  onChangeText={SetPhone}   />
    <Ionicons name='call-outline' size={17} color="#539165" style={styles.icons} />
   

  <View style={{flexDirection:"row",justifyContent:"space-around",marginLeft:10}}>

  <TextInput    placeholder={'dd'}  keyboardType='numeric'  onChangeText={SetDay}  style={styles.StyleInput} maxLength={2} />
 
    <TextInput   placeholder={'mm'}  keyboardType='numeric'  onChangeText={SetMonth}  style={styles.StyleInput} maxLength={2}/>
    <TextInput   placeholder={'yy'}  keyboardType='numeric'  onChangeText={SetYear}  style={styles.StyleInput} maxLength={4}/>
  </View>
  </View>
          <Botton label={"Register"} onPress={handleSignUp} />
 
    <View style={{flexDirection:'row',marginLeft:45,marginTop:20}}>
      <TouchOpacity  onPress={()=>{}} Src={Facebook} borderColorr='#539165' />
          <TouchOpacity Src={Googlee} borderColorr='#539165' title={accessToken?"Get user Data":"Login" } style={{width:300}} onPress={accessToken?getUserData:()=>promptAsync({useProxy:true,showInRecents:true})}   />
          <TouchOpacity  borderColorr='#539165' onPress={()=>{}} Src={Twitter} />
          </View>
          <View style={{flexDirection:'row',marginTop:20}}>
                    <Text style={{fontSize:15,fontWeight:'bold',marginLeft:90,color:'#fff'}}>Already register?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}>
            <Text style={{color:'#539165',fontWeight:700,marginLeft:10,marginRight:5,borderBottomColor: '#539165',borderBottomWidth: 2,marginBottom: 70}}>Login</Text>
            </TouchableOpacity>
            </View>  
        </ImageBackground>
    </ScrollView>
    </SafeAreaView>
    </ScrollView>
    </SafeAreaView>
    );
  };
  
      const styles=StyleSheet.create({
        container: {
          flex:1,
        backgroundColor:"#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      // backgroundImage: {
      //   width: "100%",
      //   height:700,   
      //  },
      profilePic:{
        width:50,
        height:50
      },
      userInfo:{
        alignItems: "center",
        justifyContent: "center"
      },
      icons:{
        marginTop:-90,marginLeft:-2,marginBottom:45
      },
      StyleInput: {
        // flex: 1,
        width: "30%",
        padding: 15,
        textAlign: "center",
       marginLeft:-20,
        marginBottom: 25,
        backgroundColor: "#fff",
        borderRadius: 20,
        borderColor: "#539165",
        borderWidth: 1,
        flexWrap:'wrap'
      }

    });
