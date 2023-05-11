import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState, useLayoutEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { auth, db } from "../firebase";

import { useNavigation } from "@react-navigation/native";

export default function Headerslide() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const userr = auth.currentUser;
  const { width: windowWidth } = useWindowDimensions();
  const [data, SetData] = useState([]);
  const [filterStat, setfilterStat] = useState(false);
  const [filteron, setfilteron] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  if (filteron == false) {
    const x = async (searchText) => {
      try {
        const q = query(
          collection(db, "Products"),
          where("category", "==", searchText)
        );
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map((Product) => ({
          id: Product.uid,
          data: Product.data(),
        }));
        setfilterStat(true);
        setSearchResults(results);
        console.log(results);
        console.log(data);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    };
  }

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
          <ScrollView horizontal={true} pagingEnabled scrollEventThrottle={1}>
            {data.map((item, key) => (
              <View style={{ justifyContent: "space-around" }}>
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    navigation.navigate("ProductDetails", {
                      productId: item.data.uid,
                    });
                  }}
                >
                  <View
                    style={{
                      width: windowWidth,
                      height: 250,
                      justifyContent: "space-around",
                      backgroundColor: "Black",
                    }}
                    key={key}
                  >
                    <ImageBackground
                      source={{ uri: item.data.IMG }}
                      style={styles.HeaderCard}
                    ></ImageBackground>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.indicatorContainer}></View>
        </View>
      </SafeAreaView>

      <View>
        <SafeAreaView>
          <View style={{ marginTop: 35, marginBottom: 40 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.scrollHead}>Categories</Text>
              <TouchableOpacity
                style={{
                  marginLeft: 200,
                  marginBottom: -23,
                  marginTop: 20,
                  backgroundColor: "#e80405",
                  borderRadius: 10,
                  height: 25,
                }}
                onPress={() => navigation.navigate("ProductsList")}
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
                    onPress={() => navigation.navigate("ProductsList")}
                    style={{
                      backgroundColor: "#FFF",
                    }}
                  >
                    <View
                      style={{
                        width: windowWidth - 260,
                        height: 170,
                        justifyContent: "space-around",
                      }}
                      key={key}
                    >
                      <ImageBackground
                        source={{ uri: item.data.IMG }}
                        style={styles.catCard}
                      ></ImageBackground>
                      <Text
                        style={{
                          color: "#e80405",
                          fontSize: 21,
                          fontWeight: "bold",
                          marginTop: 5,
                          marginRight: 7,
                          marginLeft: -3,
                          textAlign: "center",
                        }}
                      >
                        {item.data.category}
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
    height: 270,
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
    marginRight: 7,
    marginLeft: -3,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-around",
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
