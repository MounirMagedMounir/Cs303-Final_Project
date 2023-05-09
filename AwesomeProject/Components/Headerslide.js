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
import { useNavigation } from "@react-navigation/native";

export default function Headerslide() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const userr = auth.currentUser;
  const { width: windowWidth } = useWindowDimensions();
  const [data, SetData] = useState([]);
  const [products, setProducts] = useState([]);
  useLayoutEffect(() => {
    const ref = collection(db, "Products");
    onSnapshot(ref, (Products) =>
      SetData(
        Products.docs.map((Product) => ({
          id: Product.uid,
          data: Product.data(),
        }))
      )
    );
  });

  return (
    <View>
      <SafeAreaView>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            // showsHorizontalScrollIndicator={false}

            scrollEventThrottle={1}
          >
            {data.map((item, key) => (
              <View>
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    navigation.navigate("ProductDetails", {
                      productId: item.data.uid,
                    });
                  }}
                >
                  <View style={{ width: windowWidth, height: 250 }} key={key}>
                    <ImageBackground
                      source={{ uri: item.data.IMG }}
                      style={styles.HeaderCard}
                    ></ImageBackground>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {/* {data.map((item,key)=>{
                const width = scrollX.interpolate({
                  inputRange: [
                    windowWidth * (key - 1),
                    windowWidth * key,
                    windowWidth * (key + 1),
                  ],
                  outputRange: [8, 16, 8],
                  extrapolate: "clamp",
                });
                return (
                  <Animated.View
                    key={key}
                    style={[styles.normalDot, { width }]}
                  />
                );
              })} */}
          </View>
        </View>
      </SafeAreaView>

      <View>
        <SafeAreaView>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.scrollHead}>Categories</Text>
              <TouchableOpacity
                style={{
                  marginLeft: 200,
                  backgroundColor: "#e80405",
                  borderRadius: 10,
                  height: 23,
                }}
              >
                <Text style={styles.scrollHeadsee}> More </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={1}
            >
              {data.map((item, key) => (
                <View>
                  <TouchableOpacity
                    key={key}
                    onPress={() => navigation.navigate("Login")}
                    style={{
                      backgroundColor: "#FFF",
                    }}
                  >
                    <View
                      style={{ width: windowWidth - 260, height: 170 }}
                      key={key}
                    >
                      <ImageBackground
                        source={{ uri: item.data.IMG }}
                        style={styles.catCard}
                      ></ImageBackground>
                      <Text
                        style={{
                          color: "#e80405",
                          fontSize: 24,
                          fontWeight: "bold",
                          marginTop: 10,
                        }}
                      >
                        {item.data.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
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
    color: "white",
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 7,
    letterSpacing: 1,
    padding: 5,
    //textDecorationLine: "underline",
    // borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#e80405",
  },
});
