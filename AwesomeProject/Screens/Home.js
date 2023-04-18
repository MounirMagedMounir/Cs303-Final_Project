import React, { useRef } from "react";
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
} from "react-native";
import { useState,useEffect} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth ,db } from "../firebase";
import SlideShow from "../Components/SlideShow";

const Imgurl = [
  "https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/4482677/pexels-photo-4482677.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/4482677/pexels-photo-4482677.jpeg?auto=compress&cs=tinysrgb&w=400",
];

export default function Home({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const userr = auth.currentUser;
  const { width: windowWidth } = useWindowDimensions();

  const [State, setState] = useState(false);

  const [UserData,SetUserData]=useState(null);

  const[authUser,setAuthUser]=useState(null);


  useEffect(()=>{
    getUserData();
    const listen=onAuthStateChanged(auth,(user)=>{
          if(user){
              setAuthUser(user);  
              setState(true);
          }else{
              setAuthUser(null);  
              setState(false);
          }
      });
  return()=>{
      listen();
    }
  },[]);
  

useEffect(()=>{
  const listen=onAuthStateChanged(auth,(user)=>{
      if(user){
          setAuthUser(user);  
          setState(true);
      }else{
          setAuthUser(null);  
          setState(false);
      }
  });
return()=>{
  listen();
}
},[]);



  const getUserData=async()=>{
    const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      SetUserData(doc.data());
    });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setName(user.email);
  //     setState(true);
  //     const uid = user.uid;
  //   } else {
  //     setState(false);
  //   }
  // });
console.log(UserData);

  return (

    <View style={styles.container}>
    <ScrollView>
    <View style={styles.container}>
        {State == true ? (
          <View>
            <TouchableOpacity onPress={() => logOut()}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6CFGuwOszeow3Iq3_cRnwWoIc83-GUB0fVQ&usqp=CAU",
                }}
                style={styles.logOutL}
              />
            </TouchableOpacity>
            <Text style={{fontSize:24,fontWeight:'bold',marginBottom:20}}>Hello {UserData?.name}</Text>
          </View>
        ) : (
          <View>
           
          </View>
        )}
      </View>
      <SafeAreaView>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ])}
            scrollEventThrottle={1}
          >
            {Imgurl.map((image, imageIndex) => {
              return (
                <View>
                  <TouchableOpacity
                    key={imageIndex}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <View
                      style={{ width: windowWidth, height: 250 }}
                      key={imageIndex}
                    >
                      <ImageBackground
                        source={{ uri: image }}
                        style={styles.HeaderCard}
                      ></ImageBackground>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {Imgurl.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, { width }]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaView>

      <View>
        <SlideShow Imgurl={Imgurl} CatName="men" />
        <SlideShow Imgurl={Imgurl} CatName="women" />
        <SlideShow Imgurl={Imgurl} CatName="east" />
        <SlideShow Imgurl={Imgurl} CatName="nourth" />
      </View>

    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logOutL: {
    marginTop: 40,
    marginLeft: 350,
    width: 50,
    height: 40,
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer1: {
    height: 250,        width: 400,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  HeaderCard: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 60,
    marginHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#539165",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollHead: {
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
  },
});
