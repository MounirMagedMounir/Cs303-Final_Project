  import React, {useEffect, useState, useContext} from 'react';
import {Text, StyleSheet, View, Image, ScrollView, SafeAreaView, Button, ImageBackground} from "react-native";
// import { getProduct } from '../services/ProductsService';
import {CartContext} from "../CartContext";
import { collection, query, where, getDocs, updateDoc, doc, orderBy } from "firebase/firestore";
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { Pressable } from 'native-base';
import Rating from "../Components/Rating";
import Botton from '../Components/btn';

export default function ProductDetails({route}) {

    const {productId} = route.params;
    console.log("heloow:"+productId);
    const {addItemToCart,getItemsCount,items} = useContext(CartContext)
    const [UserData,SetUserData]=useState(null);
    // const[authUser,setAuthUser]=useState(null);
    const userr=auth.currentUser;
    useEffect(()=>{
      getUserData();
      const listen=onAuthStateChanged(auth,(user)=>{
            if(user){
                setAuthUser(user);  
            }else{
                setAuthUser(null);  
            }
        });
    return()=>{
        listen();
      }
    },[]);
  
  const[authUser,setAuthUser]=useState(null);
      useEffect(()=>{
          const listen=onAuthStateChanged(auth,(user)=>{
              if(user){
                  setAuthUser(user);  
              }else{
                  setAuthUser(null);  
              }
          });
      return()=>{
          listen();
      }
      },[]);
  const getUserData = async () => {
      const q = query(collection(db,"Products"), where("uid", "==",productId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          console.log(doc.id, " ====> ", doc.data());
          SetUserData(doc.data());
      });
  };
  

    function onAddToCart(){
      addItemToCart(UserData)
    }

  return (
    <SafeAreaView>
        <View style={{  backgroundColor:"#22583b"}}>
           <View style={styles.imageContainer}>
        <Image  source={{uri:UserData?.IMG}}  style={styles.image}/>
 
        {/*
          
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{UserData?.name}</Text>
                <Text style={styles.price}>$ {UserData?.price}</Text>
                <Text style={styles.description}>{UserData?.description}</Text>
          
            <Button onPress={onAddToCart} style={{backgroundColor:"#00a46c"}} title="Add To Cart" />
       
            </View> */}
                   <Pressable
            
            style={{
              height: 200,
              elevation: 2,
              backgroundColor: "#fff",
              marginLeft: 0,
              marginTop: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius:20,
              marginBottom: 350,
              width: 360,
            }}
          >
         
          {/* <View style={styles.imageContainer}> */}
            {/* <Image  source={{uri:UserData?.IMG}}  style={{width:"100%",height:"70%",resizeMode:"cover",borderRadius:5,marginTop:0}}/> */}
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                paddingHorizontal: 10,
                marginBottom:25
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                fontSize:35
                }}
              >
                {UserData?.name}
              </Text>
              <Text
                style={{
                 marginTop:70,
                 marginHorizontal:"-56%",
                  fontWeight: "bold",
                  color: "#00a46c",
                  fontSize:25,
                  paddingLeft: 35,
                 
                }}
              >
               $ {UserData?.price}
              </Text>
            </View>
            <View style={{ marginLeft: 250,marginTop:-55,marginBottom:30}}>
            <Rating value={UserData?.rating} />
            </View>
            <Botton label={"Add To Cart"} color={"#000"} onPress={onAddToCart}/>

            {/* <View style={{ marginLeft: 10}}>
             <Rating value={item.data.rating} />
            </View> */}
        {/* </View> */}
          </Pressable>
          </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      backgroundColor: '#22583b',
      marginTop:113

    },
    image: {
      width: 700,
      height:'30%',
      
      resizeMode:'contain',
     marginTop:30,
      marginBottom:105
    },
    infoContainer: {
        padding: 10
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      fontWeight: '400',
      color: '#787878',
      marginBottom: 16,
    },
  });
