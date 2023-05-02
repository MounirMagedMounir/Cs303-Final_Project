import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
// import { getProducts } from "../services/ProductsService";
// import { Product } from "../Components/product";
import { getProducts } from "../data/product";
import { Box, Center, Flex, Heading, VStack } from "native-base";
import Rating from "../Components/Rating";
// import { LinearGradient } from "expo-linear-gradient";
// import { TouchableOpacity } from "react-native-gesture-handler";

export function ProductsList({ navigation }) {
  // function renderProduct({item: product}){
  // return(
  //     <Product
  //         {...product}
  //         onPress={() => {
  //             navigation.navigate('ProductDetails', {productId: product.id})
  //         }}
  //     />
  // )
  // return <Box flex="1" safeAreaTop>
  // <ScrollView>
  //   <VStack space={2.5} w="100%" px="3">
  // <Flex direction="row" mb="2.5" mt="1.5">
  // <Center size="16" bg="primary.100" _text={{
  // color: "coolGray.800"
  // }}>
  //   {product.name}
  // </Center>
  // <Center size="16" bg="primary.100" _text={{
  // color: "coolGray.800"
  // }}>
  //   {product.name}
  // </Center>

  // </Flex>
  //         </VStack>
  //       </ScrollView>
  //     </Box>;

  // }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  });
  return (
    // <ScrollView flex={1} marginTop={10} showsVerticalScrollIndicator={false}>

    //     <Flex flexWrap="wrap" direction="row" justifyContent="space-between" px={6}>

    // {products.map((product )=>(

    //   <Pressable key={product.id} style={{backgroundColor:"#fff",width:100,shadow:2,paddingTop:0.3,paddingBottom:2,rounded:"md",overflow:"hidden",marginBottom:10,marginHorizontal:27}}  onPress={() => {navigation.navigate('ProductDetails', {productId: product.id})}}>
    // <Image source={product.image} alt={product.name}  style={{height:70,width:100}} resizeMode="contain" />
    //   <Box px={4} pt={1}>
    //     <Heading size="sm" bold ml={3}>${product.price}</Heading>
    //   <Text style={{fontSize:10,marginTop:1,marginLeft:2}}  w="full">{product.name}</Text>
    //    <Rating value={product.rating}/>
    //     </Box>

    //    </Pressable>
    <ScrollView flex={1} marginTop={10} showsVerticalScrollIndicator={false}>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={-1}
        marginLeft={-3}
        marginRight={3}
      >
        {products.map((product) => (
          <Pressable
            key={product.id}
            onPress={() => {
              navigation.navigate("ProductDetails", { productId: product.id });
            }}
            style={{
              height: 250,
              elevation: 2,
              backgroundColor: "#FFF",
              marginLeft: 20,
              marginTop: 20,
              borderRadius: 15,
              marginBottom: 10,
              width: 160,
            }}
          >
            <Image source={product.assetss} />
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {product.name}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#00a46c",
                  paddingLeft: 35,
                }}
              >
                {product.price}$
              </Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Rating value={product.rating} />
            </View>
          </Pressable>
        ))}
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
