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

import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Pressable } from "native-base";
import Rating from "../Components/Rating";
import Botton from "../Components/btn";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
TouchableOpacity.defaultProps = { activeOpacity: 0.7 };

export default function ProductDetails({ route }) {
  const { productId } = route.params;
  console.log("heloow:" + productId);
  const { addItemToCart, getItemsCount, items } = useContext(CartContext);
  const [UserData, SetUserData] = useState(null);

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
      <Text style={styles.appButtonText}>
        {title}

        <MaterialCommunityIcons
          name="cart"
          style={{
            fontSize: 25,
            color: "wihte",
            padding: 5,
            borderWidth: 2,
            borderRadius: 25,
            marginLeft: 15,
            marginRight: -5,
            borderColor: "black",
            backgroundColor: "black",
          }}
        />
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "#F9F2ED" }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: UserData?.IMG }} style={styles.image} />

          <Pressable
            style={{
              height: 260,
              elevation: 2,
              backgroundColor: "#fff",
              marginLeft: 0,
              marginTop: 0,
              marginBottom: 45,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginBottom: 350,
              width: 395,
            }}
          >
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
                {UserData?.price}.00 $
              </Text>
            </View>
            <View style={{ marginLeft: 250, marginTop: -40, marginBottom: 25 }}>
              <Rating value={UserData?.rating} />
            </View>
            <AppButton title="Add to Card " />
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
    marginTop: 13,
  },
  image: {
    width: 475,
    height: "55%",

    resizeMode: "contain",
    marginTop: 3,
    marginBottom: -17,
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
    marginTop: -7,
    marginBottom: 15,
    color: "white",
    size: 300,
    fontSize: 25,
    fontWeight: "bold",
    height: 35,
    marginRight: 10,
    marginLeft: -3,

    // width: 355,
    letterSpacing: 1,
    textAlign: "center",
  },
  appButtonContainer: {
    marginTop: 27,
    padding: 20,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 23,
    backgroundColor: "black",
    marginHorizontal: 1,
  },
});
