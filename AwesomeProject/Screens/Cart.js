import React, {useEffect, useState, useContext} from "react";
import {View, Image, Text, FlatList, StyleSheet} from "react-native";
import {CartContext} from "../CartContext";
// import {getProduct} from "../data/product"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "native-base";
// import {CartEmpty} from "../Components/CartEmpty"
import { FontAwesome } from '@expo/vector-icons';
export  function CartNew(){
    
    // const {productId} = route.params;
    // const [product, setProduct] = useState({});
    const {items,deleteItemToCart,addItemToCart, getTotalPrice,getItemsCount} = useContext(CartContext);

    // useEffect(() => {
    //     setProduct(getProduct(productId))
    // })
    const [product, setProduct] = useState({});
    let [it, setIt] = useState([]);

    function deleteFromCart(id){
   
        deleteItemToCart(id);
    
      }
      function onAddToCart(id){
        addItemToCart(id)
      }
    function Totals(){
       
        let [total, setTotal] = useState(0);
       
        useEffect(() => {
            setTotal(getTotalPrice())
            setIt(items)
        })
        return(
          <>
            {getItemsCount()>0? <View style={styles.cartLineTotal}>
           
            <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          
            <Text style={styles.mainTotal}>$ {total+" "}</Text>
        </View>: <View style={{marginLeft:"40%",marginVertical:"65%"}}>
                <FontAwesome name='shopping-basket'  size={100} color={"#4c7cff"} />
                <Text color={"#539165"} style={{marginLeft:15 ,fontWeight:"bold"}} >Cart is Empty</Text>

                </View>}
          </>
        )
     
    }

 
    function renderItem({item}){
        return(
            <>
             {item.qty>0?
             <View style={{marginTop:-10,backgroundColor:"#fff"}}>
             <View style={styles.cartLine}>
                    <Image style={styles.image} source={item.product.assetss} />
                    <Text style={styles.lineLeft}>{item.product.name} x {item.qty} <Text style={styles.productTotal}>${item.totalPrice}</Text></Text>
                    <View style={{marginTop:40,marginLeft:-170,flexDirection:"row",marginBottom:-1}}>
                    <Button style={styles.button} marginRight={20}  onPress={() => onAddToCart(item.product.id)}>+</Button>
                    <Button  style={styles.button} onPress={() => deleteFromCart(item.product.id)}>-</Button>
                    {/* <Button style={styles.delete} onPress={() => deleteFromCart(item.product.id)}>delete</Button> */}

                    </View>
                </View>
                </View>:<Text></Text>
                       }
                
            </>
        )
    }

    return(
        <FlatList
            style={styles.itemsList}
            contentContainerStyle={styles.itemsListContainer}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.product.id}
            ListFooterComponent={Totals}
        />
    )

}

const styles = StyleSheet.create({
	cartLine: {
		flexDirection: 'row',
		width: '100%',
		paddingVertical: 10,
        borderColor:"#eeeeee",
    borderBottomColor:"#4c7cff",
        borderWidth:3,
	
    },
	image: {
		width: '25%',
		aspectRatio: 1,
		marginRight: 5
	},
	cartLineTotal: {
		flexDirection: 'row',
		borderTopColor: '#dddddd',
		borderTopWidth: 1
	},
	productTotal: {
		fontWeight: 'bold'
	},
	lineTotal: {
		fontWeight: 'bold'
	},
	lineLeft: {
		fontSize: 20,
		lineHeight: 40,
		color: '#333333',
    paddingHorizontal:3
	},
	lineRight: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333333',
		textAlign: 'left',
	},
	mainTotal: {
		flex: 1,
		fontSize: 20,
		fontWeight: 'bold',
		lineHeight: 40,
		color: '#333333',
		textAlign: 'right'
	},
	itemsList: {
		backgroundColor: '#eeeeee'
	},
	itemsListContainer: {
		backgroundColor: '#eeeeee',
		paddingVertical: 8,
		marginHorizontal: 8
	},  button: {
        alignItems: 'center',
        backgroundColor: '#4c7cff',
        marginRight:"-15%",
        marginLeft:"25%",
        marginTop:4,
        marginBottom:30,
      },
      delete: {
        alignItems: 'center',
        backgroundColor: '#4c7cff',
      marginTop:4,
      marginBottom:30,
        marginLeft:27,
      },
})