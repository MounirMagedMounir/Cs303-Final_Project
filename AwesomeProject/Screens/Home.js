import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import SlideShow from "../Components/SlideShow";
import Headerslide from "../Components/Headerslide";
import Search from "../Components/Search";
import b from "../assets/249.jpg";

export default function Home({ navigation }) {
  const [State, setState] = useState(false);

  const [UserData, SetUserData] = useState(null);

  const [authUser, setAuthUser] = useState(null);

  const [refreshing, setRefreshing] = React.useState(false);

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
      console.log(doc.id, " => ", doc.data());
      SetUserData(doc.data());
    });
  };

  console.log(UserData);

  return (
    <ImageBackground source={b} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: -5,
            marginTop: 10,
          }}
        >
          <View style={{ flex: 4, height: 4, backgroundColor: "black" }} />
          <View>
            <Text
              style={{
                textAlign: "center",
                paddingHorizontal: 8,
                fontSize: 23,
                fontWeight: "bold",
                fontStyle: "italic",
                color: "white",
                backgroundColor: "black",
                letterSpacing: 1,
                marginRight: 1,
                marginLeft: -1,
              }}
            >
              M3AE-SHOP
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              height: 2,
              backgroundColor: "#FF1E00",
            }}
          />
        </View>
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
                        marginTop: 10,
                      }}
                    >
                      Hello {UserData?.name}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 15,
                        marginBottom: 15,
                        padding: 5,
                        width: "130%",
                      }}
                    ></View>
                  </View>
                )}
                <Search />
              </View>

              <Headerslide />
              <View>
                <SlideShow CatName="men" />
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch",
    backgroundColor: "red",
    height: "100%",
    width: "100%",
  },
});
