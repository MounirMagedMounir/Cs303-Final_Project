import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import SlideShow from "../Components/SlideShow";
import Headerslide from "../Components/Headerslide";

const Imgurl = [
  "https://images.pexels.com/photos/794494/pexels-photo-794494.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/906150/pexels-photo-906150.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/593655/pexels-photo-593655.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/4482677/pexels-photo-4482677.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/133472/pexels-photo-133472.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/39574/flower-exotic-colorful-pink-39574.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/668465/pexels-photo-668465.jpeg?auto=compress&cs=tinysrgb&w=1600",

  "https://images.pexels.com/photos/639086/pexels-photo-639086.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

export default function Home({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const userr = auth.currentUser;
  const { width: windowWidth } = useWindowDimensions();

  const [State, setState] = useState(false);

  const [UserData, SetUserData] = useState(null);

  const [authUser, setAuthUser] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const [data, SetData] = useState([]);
  const [products, setProducts] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getUserData();
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setState(true);
      } else {
        setAuthUser(null);
        setState(false);
      }
    });
    return () => {
      getUserData();
      listen();
    };
  }, []);

  useEffect(() => {
    getUserData();
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        getUserData();
        setState(true);
      } else {
        setAuthUser(null);
        setState(false);
      }
    });
    return () => {
      getUserData();
      listen();
    };
  }, []);

  const getUserData = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      SetUserData(doc.data());
    });
  };

  console.log(UserData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.container}>
              {State == true ? (
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 20,
                      marginLeft: 10,
                    }}
                  >
                    Hello {UserData?.name}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 20,
                      marginLeft: 15,
                      marginTop: 10,
                      color: "#e80405",
                    }}
                  >
                    Hello to M3AE
                  </Text>
                </View>
              )}
            </View>

            <Headerslide />
            <View>
              <SlideShow CatName="East" />
              <SlideShow CatName="West" />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    height: 250,
    width: 400,
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
  catCard: {
    flex: 1,
    marginVertical: 1,
    marginHorizontal: 1,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
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
    backgroundColor: "#e80405",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollHeadsee: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollHead: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    letterSpacing: 1,
  },
});
