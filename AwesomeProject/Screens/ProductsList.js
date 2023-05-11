import React, { useState } from "react";
import { db } from "../firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

import { Flex } from "native-base";
import Rating from "../Components/Rating";

import { collection, query, where, getDocs } from "firebase/firestore";

export default function ProductsList({ navigation }, searchHome) {
  const [data, SetData] = useState([]);
  const [filterStat, setfilterStat] = useState(false);
  const [filteron, setfilteron] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchText) => {
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

  return (
    <ScrollView flex={1} marginTop={10} showsVerticalScrollIndicator={false}>
      {filteron == true ? (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setfilteron(false)}>
            <Ionicons
              style={{
                height: 40,

                marginLeft: 20,
                marginTop: 2,
                marginBottom: 10,
                width: 60,
              }}
              size={50}
              name="close-outline"
            ></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setfilterStat(false)}>
            <Ionicons
              style={{
                height: 40,
                marginLeft: 250,
                marginTop: 9,
                marginBottom: -10,
                width: 60,
              }}
              size={37}
              name="refresh-outline"
            ></Ionicons>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => setfilteron(true)}>
          <Ionicons
            style={{
              height: 42,

              marginLeft: 20,
              marginTop: 2,
              marginBottom: 10,
              width: 60,
            }}
            size={47}
            name="options-outline"
          ></Ionicons>
        </TouchableOpacity>
      )}
      {filteron == true ? (
        <>
          <View style={{ flexDirection: "row" }}>
            {data.map((item, key) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#000000",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  marginVertical: 10,
                }}
                onPress={() => handleSearch(item.data.category)}
              >
                <Text>{item.data.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : null}

      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={-1}
        marginLeft={-3}
        marginRight={3}
      >
        {filterStat == true ? (
          <>
            {searchResults.map((item, key) => (
              <Pressable
                style={{
                  height: 250,
                  elevation: 2,
                  backgroundColor: "#FFF",
                  marginLeft: 20,
                  marginTop: 15,
                  borderRadius: 15,
                  marginBottom: 10,
                  width: 160,
                }}
                key={key}
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    productId: item.data.uid,
                  });
                }}
              >
                <Image
                  source={{ uri: item.data.IMG }}
                  style={{
                    width: "100%",
                    height: "70%",
                    resizeMode: "cover",
                    borderRadius: 5,
                    marginTop: 0,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 15,
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
                      color: "#00a46c",
                      paddingLeft: 35,
                    }}
                  >
                    {item.data.price}$
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Rating value={item.data.rating} />
                </View>
              </Pressable>
            ))}
          </>
        ) : (
          <>
            {data.map((item, key) => (
              <Pressable
                key={key}
                onPress={() => {
                  navigation.navigate("ProductDetails", {
                    productId: item.data.uid,
                  });
                }}
                style={{
                  height: 250,
                  elevation: 2,
                  backgroundColor: "#FFF",
                  marginLeft: 20,
                  marginTop: 15,
                  borderRadius: 15,
                  marginBottom: 10,
                  width: 160,
                }}
              >
                <Image
                  source={{ uri: item.data.IMG }}
                  style={{
                    width: "100%",
                    height: "70%",
                    resizeMode: "cover",
                    borderRadius: 5,
                    marginTop: 0,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 15,
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
                      color: "#00a46c",
                      paddingLeft: 35,
                    }}
                  >
                    {item.data.price}$
                  </Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Rating value={item.data.rating} />
                </View>
              </Pressable>
            ))}
          </>
        )}
      </Flex>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: "#eeeeee",
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
