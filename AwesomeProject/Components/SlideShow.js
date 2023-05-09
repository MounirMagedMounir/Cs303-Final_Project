import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

export default function SlideShow({ CatName }) {
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation();

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
      <ScrollView>
        <SafeAreaView>
          <View style={styles.scrollContainer1}>
            <View style={{ flexDirection: "row", marginTop: 40 }}>
              <Text style={styles.scrollHead}>{CatName}</Text>
              <TouchableOpacity
                style={{
                  marginLeft: 155,
                  backgroundColor: "#e80405",
                  borderRadius: 10,
                  height: 25,
                  marginTop: 20,
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
                <View
                  style={{
                    marginLeft: -5,
                    marginRight: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    key={key}
                    onPress={() => {
                      navigation.navigate("ProductDetails", {
                        productId: item.data.uid,
                      });
                    }}
                    style={{
                      height: 230,
                      elevation: 2,
                      backgroundColor: "#FFF",
                      marginLeft: 20,
                      marginTop: 10,
                      borderRadius: 15,
                      marginBottom: 10,
                      width: 160,
                    }}
                  >
                    <View
                      style={{ width: windowWidth - 225, height: 200 }}
                      key={key}
                    >
                      <Image
                        source={{ uri: item.data.IMG }}
                        style={styles.card}
                      />

                      <View
                        style={{
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {item.data.name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            color: "#e80405",
                            paddingTop: 10,
                          }}
                        >
                          {item.data.price}$
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer1: {
    height: 320,
    width: 400,
    marginBottom: 15,
    marginTop: -15,
    alignItems: "center",
    justifyContent: "center",
  },

  HeaderCard: {
    flex: 1,
    marginVertical: 40,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 2,
    marginTop: 1,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(210, 19, 18,0.8)",
    borderRadius: 7,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "red",
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
    marginLeft: -5,
    marginRight: 9,
    letterSpacing: 1,
    padding: 5,
    textDecorationLine: "underline",
    // borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#e80405",
  },
});
