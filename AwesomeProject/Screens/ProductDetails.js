import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
// import { getProduct } from '../services/ProductsService';
import { CartContext } from "../CartContext";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Pressable } from "native-base";
import Rating from "../Components/Rating";
import Botton from "../Components/btn";
TouchableOpacity.defaultProps = { activeOpacity: 0.7 };

export default function ProductDetails({ route }) {
  const { productId } = route.params;
  console.log("heloow:" + productId);
  const { addItemToCart, getItemsCount, items } = useContext(CartContext);
  const [UserData, SetUserData] = useState(null);
  // const[authUser,setAuthUser]=useState(null);
  const userr = auth.currentUser;
  useEffect(() => {
    getUserData();
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  const getUserData = async () => {
    const q = query(collection(db, "Products"), where("uid", "==", productId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " ====> ", doc.data());
      SetUserData(doc.data());
    });
  };

  function onAddToCart() {
    addItemToCart(UserData);
  }
  const AppButton = ({ onPress, title, size, backgroundColor }) => (
    <TouchableOpacity onPress={onAddToCart} style={[styles.appButtonContainer]}>
      <Text style={[styles.appButtonText]}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "#D21312" }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: UserData?.IMG }} style={styles.image} />

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
              borderTopRightRadius: 20,
              marginBottom: 350,
              width: 393,
            }}
          >
            {/* <View style={styles.imageContainer}> */}
            {/* <Image  source={{uri:UserData?.IMG}}  style={{width:"100%",height:"70%",resizeMode:"cover",borderRadius:5,marginTop:0}}/> */}
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                paddingHorizontal: 10,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 35,
                  marginLeft: 17,
                  Color: "#191919",
                }}
              >
                {UserData?.name}
              </Text>
              <Text
                style={{
                  marginTop: 55,
                  marginHorizontal: "-53%",
                  fontWeight: "bold",
                  color: "rgba(210, 19, 18,0.8)",
                  fontSize: 25,
                  paddingLeft: 5,
                }}
              >
                {UserData?.price} $
              </Text>
            </View>
            <View style={{ marginLeft: 250, marginTop: -50, marginBottom: 37 }}>
              <Rating value={UserData?.rating} />
            </View>
            <AppButton title="Add to Card" />
            {/* <Botton
              label={"Add To Cart"}
              color={"#rgba(210, 19, 18,0.8)"}
              onPress={onAddToCart}
            /> */}
            {/* <View style={{ marginLeft: 10}}>
             <Rating value={item.data.rating} />
            </View> */}
            {/* </View> */}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D21312 ",
    marginTop: 113,
  },
  image: {
    width: 700,
    height: "35%",
    // backgroundColor: "#FC2947",
    resizeMode: "contain",
    marginTop: 30,
    marginBottom: 105,
    padding: 15,
    borderRadius: 35,
    borderColor: "black",
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#787878",
    marginBottom: 16,
  },
  appButtonText: {
    marginTop: 3,
    color: "black",
    size: 100,
    fontSize: 17,
    fontWeight: "bold",
    height: 27,
    // width: 355,
    letterSpacing: 1,
    textAlign: "center",
  },
  appButtonContainer: {
    marginTop: 5,
    padding: 9,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "rgba(210, 19, 18,0.8)",
    marginHorizontal: 17,
  },
});
