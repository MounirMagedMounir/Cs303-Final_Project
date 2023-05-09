import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";
<<<<<<< HEAD

=======
import Ionicons from "react-native-vector-icons/Ionicons";
>>>>>>> b0ae783dcd56529ba6fc929b85b23a8bca831e36
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Pressable,Button,
  Image,TouchableOpacity
} from "react-native";
// import { getProducts } from "../services/ProductsService";
// import { Product } from "../Components/product";
import { getProducts } from "../data/product";
import { Box, Center, Flex, Heading, VStack } from "native-base";
import Rating from "../Components/Rating";
// import { LinearGradient } from "expo-linear-gradient";
// import { TouchableOpacity } from "react-native-gesture-handler";
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
<<<<<<< HEAD
import Search from "../Components/Search";
=======
import { TextInput } from "react-native-paper";
>>>>>>> b0ae783dcd56529ba6fc929b85b23a8bca831e36

export default function ProductsList({ navigation },searchHome) {

  const [data, SetData] = useState([]);
<<<<<<< HEAD
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
=======
  const [filterStat, setfilterStat] = useState(false);
  const [filteron, setfilteron] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
 
  const handleSearch = async (searchText) => {
    try {
      const q = query(collection(db, 'Products'), where('category', '==', searchText));
      const querySnapshot = await getDocs(q);
>>>>>>> b0ae783dcd56529ba6fc929b85b23a8bca831e36

      const results = querySnapshot.docs.map((Product) => ({
        id: Product.uid,
        data: Product.data(),
      }));
      setfilterStat(true);
      setSearchResults(results);
      console.log(results);
      console.log(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };


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
<<<<<<< HEAD
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
            PROUDUCTS
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
          marginBottom: 15,
          padding: 5,
          width: "130%",
        }}
      >
        <Search />
      </View>
=======
   
    <ScrollView flex={1} marginTop={10} showsVerticalScrollIndicator={false}>
{ filteron==true?
<View style={{  flexDirection: "row",}} >
<TouchableOpacity  
   onPress={() => setfilteron(false)}>
        <Ionicons  style={{
              height: 40,
          
              marginLeft: 20,
              marginTop: 2,
              marginBottom: 10,
              width: 60,
              
            }}
            size={50}
            name="close-outline"></Ionicons>
            </TouchableOpacity>
            
            <TouchableOpacity  
   onPress={() => setfilterStat(false)}>
        <Ionicons  style={{
              height: 40,
              marginLeft: 250,
              marginTop: 9,
              marginBottom: -10,
              width: 60,
              
            }}
            size={37}
            name="refresh-outline"></Ionicons>
            </TouchableOpacity></View>:
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
            name="options-outline"></Ionicons>
            </TouchableOpacity>

}
             {filteron==true? <>
            


<View style={{  flexDirection: "row",}}>
{data.map((item, key) => (
          
          <TouchableOpacity style={{ 
            backgroundColor: "#FFFFFF",
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#000000",
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginVertical: 10,}}
          onPress={() => handleSearch(item.data.category)}
          >
         <Text>{item.data.category}</Text>  
          
           </TouchableOpacity>
        ))}
       </View>
       </>
       :null}
      
>>>>>>> b0ae783dcd56529ba6fc929b85b23a8bca831e36
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={-1}
        marginLeft={-3}
        marginRight={3}
      >
<<<<<<< HEAD
        {data.map((item, key) => (
=======
       {filterStat==true? 
       <>
       {searchResults.map((item, key) => (
>>>>>>> b0ae783dcd56529ba6fc929b85b23a8bca831e36
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
<<<<<<< HEAD
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
=======
>>>>>>> b0ae783dcd56529ba6fc929b85b23a8bca831e36
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
        </>:<>
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
        ))}</>}
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
