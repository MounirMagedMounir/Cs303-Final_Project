import React, {useEffect, useState, useContext} from 'react';
import {Text, StyleSheet, View, Image, ScrollView, SafeAreaView, Button} from "react-native";
// import { getProduct } from '../services/ProductsService';
import {getProduct} from "../services/product"
import {CartContext} from "../CartContext";
import { TouchableOpacity } from 'react-native-gesture-handler';

export  function ProductDetails({route}) {

    const {productId} = route.params;
    const [product, setProduct] = useState({});
    const {addItemToCart,getItemsCount,items} = useContext(CartContext)

    useEffect(() => {
        setProduct(getProduct(productId))
      })


    function onAddToCart(){
      addItemToCart(product.id)
    }
 

  return (
    <SafeAreaView>
        <ScrollView style={{  backgroundColor:"#fff"}}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={product.assetss}  />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>$ {product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>
          
            <Button onPress={onAddToCart} style={{backgroundColor:"#00a46c"}} title="Add To Cart" />
       
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      backgroundColor: '#fff'
    },
    image: {
      width: 500,
      height:'50%',
      aspectRatio: 1,
      resizeMode:'contain'
    },
    infoContainer: {
        padding: 10
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      fontWeight: '400',
      color: '#787878',
      marginBottom: 16,
    },
  });