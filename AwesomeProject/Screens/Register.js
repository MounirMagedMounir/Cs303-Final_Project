import React from 'react';
import {View,TextInput,SafeAreaView,ScrollView,ImageBackground,StyleSheet,TouchableOpacity,Image,Text} from 'react-native';
import InputField from '../Components/Input';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Botton from '../Components/btn'
import Facebook from '../assets/facebook.png'
import Googlee from '../assets/google.png'
import Twitter from '../assets/twitter.png'
import TouchOpacity from '../Components/TouchOpacity'
import {auth,db} from '../firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { Alert } from 'react-native';
export default function Signup({ navigation }) {
  const[accessToken,SetAccessToken]=useState();
 const[userInfo,SetUserInfo]=useState();
  const[request,response,promptAsync]=Google.useAuthRequest({
    expoClientId:"248629810532-gae2c1d016o919dhta3kdgtojt9cegoq.apps.googleusercontent.com"
  })
  const[name,SetName]=useState('');
 const[phone,SetPhone]=useState('');
const[email,SetEmail]=useState('');
const[password,SetPassword]=useState('');   
const[confPassword,SetconfPassword]=useState('');  
  const[Icon,SetIcon]=useState('eye-off-outline');
  const[Icon2,SetIcon2]=useState('eye-off-outline');
  const[bool,Setbool]=useState(true);
  const[bool2,Setbool2]=useState(true);
  console.log(bool);
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
  const ChangeIcon2=()=>{
    if (Icon2==='eye-off-outline') {
      SetIcon2('eye-outline')
      Setbool2(false)
    }
   else  {
    SetIcon2('eye-off-outline')
    Setbool2(true)
    
  } 
  }
  const handleSignUp=async()=>{
if(name.trim().length<2 ){
    Alert.alert("please enter a name")
    }else{
if(password===confPassword ){
await createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user;
    const docRef = await addDoc(collection(db, "users"), {
     email: email.toLowerCase().trim(), 
    uid:user.uid,
    name:name.trim(),
    password:password.trim(),
    phone:phone.trim(),
    });
    Alert.alert("done");
    navigation.navigate("Login");
  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert(errorMessage);
  });
}else{
Alert.alert('Password doesnot match');
}
}
}
  

  const getUserData = async()=>{
    let userInfoResponse=await fetch("https://www.googleapis.com/userinfo/v2/me",{
      headers: {Authorization:`Bearer ${accessToken}`},
    });
    userInfoResponse.json().then(data=>{
      SetUserInfo(data);
    })
    let password="1234567";
    await createUserWithEmailAndPassword(auth, userInfo.email, password)
    .then(async(userCredential) => {
      const user = userCredential.user;
      const docRef = await addDoc(collection(db, "users"), {
       email: userInfo.email.toLowerCase().trim(), 
      uid:user.uid,
      name:userInfo.name.trim(),
      password:password.trim(),
      });
      Alert.alert("done");
      
    })
  
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert(errorMessage);
    });
   
   } ;

  useEffect(()=>{
    if(response?.type==="success"){
      SetAccessToken(response.authentication.accessToken);

    }
    },[response]);

return(
<SafeAreaView >
<ScrollView showsVerticalScrollIndicator={false}>
<ImageBackground source={require('../assets/Image1.jpeg')} style={styles.backgroundImage} resizeMode="cover" >
<View style={{marginTop:110,marginLeft:"15%",marginRight:"20%"}}>
<InputField  icon={<Ionicons name="person-circle-outline"size={17} color="#666" style={{marginTop:20,marginLeft:-30}} /> } label={'Full name'}  value={name} onChangeText={SetName} />
<InputField  icon={<Ionicons name="mail-outline"size={17} color="#666" style={{marginTop:20,marginLeft:-30}} /> } label={'Email'}   keyboardType="email-address" value={email} onChangeText={SetEmail} />
<InputField  icon={<Ionicons name="ios-lock-closed-outline"size={17} color="#666" style={{marginTop:20,marginLeft:-30}} /> } label={'Password'} inputType="password" value={password} onChangeText={SetPassword} r={bool} />
<Ionicons name={Icon} size={19} color="#666" style={{marginTop:-65,marginBottom:40,marginRight:190}} onPress={ChangeIcon}></Ionicons>
<InputField  icon={<Ionicons name='ios-lock-closed-outline' size={17} color="#666" style={{marginTop:20,marginLeft:-30}} /> } label={'Confirm password'} inputType="password"  value={confPassword} onChangeText={SetconfPassword} r={bool2}/>
<Ionicons name={Icon2} size={19} color="#666" style={{marginTop:-65,marginBottom:40,marginRight:190}} onPress={ChangeIcon2}></Ionicons>

<InputField  icon={<Ionicons name='call-outline' size={17} color="#666" style={{marginTop:20,marginLeft:-30}} /> } label={'Phone'}  keyboardType='numeric'  onChangeText={SetPhone} />
       <Botton label={"Register"} onPress={handleSignUp} />
</View>
 <View style={{flexDirection:'row',marginLeft:45,marginTop:20}}>
      <TouchOpacity  onPress={()=>{}} Src={Facebook}/>
      <TouchOpacity Src={Googlee} title={accessToken?"Get user Data":"Login" } style={{width:300}} onPress={accessToken?getUserData:()=>promptAsync({useProxy:true,showInRecents:true})}   />
      <TouchOpacity  onPress={()=>{}} Src={Twitter} />
       </View>
       <View style={{flexDirection:'row',marginTop:20}}>
         <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
         <Text style={{color:'#FE3539',fontWeight:700,marginLeft:110,marginRight:5}}>Login</Text>
         </TouchableOpacity>
         <Text style={{fontSize:15,fontWeight:'bold'}}>Already register?</Text>
        </View>  
    </ImageBackground>
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
  backgroundImage: {
    width: "100%",
    height:700,   
   },
  profilePic:{
    width:50,
    height:50
  },
  userInfo:{
    alignItems: "center",
    justifyContent: "center"
  }
  });