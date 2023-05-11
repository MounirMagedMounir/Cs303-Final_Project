import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import { CartContext } from "../CartContext";

import { Button } from "native-base";

import { FontAwesome } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
export default function Cart({ navigation }) {
  const {
    items,
    deleteItemToCart,
    addItemToCart,
    getTotalPrice,
    getItemsCount,
  } = useContext(CartContext);

  const [product, setProduct] = useState({});

  let [it, setIt] = useState([]);

  let [total, setTotal] = useState(0);
  let [flag, setflag] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    setTotal(getTotalPrice());
    setIt(items);
  });

  const [modalVisible, setModalVisible] = useState(false);
  function Model(value) {
    console.log(value);

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>please login!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  const Buy = async () => {
    setProduct(
      items.map((itm) => ({
        id: itm.id,
        qtn: itm.qty,
      }))
    );
    if (flag === false) {
      setflag(true);
      Alert.alert("Confirm", "Are you sure?", [
        {
          text: "Cancel",
          onPress: () => setflag(false),
          style: "cancel",
        },
        { text: "OK" },
      ]);
    } else {
      await addDoc(collection(db, "UserBuy"), {
        id: auth.currentUser.uid,
        cart: product,
      });
      Alert.alert("Success");

      setflag(false);
    }
  };

  function deleteFromCart(id) {
    setflag(false);

    const flage = items.find((item) => item.id == id);
    if (flage) {
      deleteItemToCart(flage["data"]);
    }
  }
  function onAddToCart(id) {
    setflag(false);
    const flage = items.find((item) => item.id == id);
    if (flage) {
      addItemToCart(flage["data"]);
    }
  }

  function Totals() {
    return (
      <>
        {getItemsCount() > 0 ? (
          <>
            <View style={styles.cartLineTotal}>
              <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>

              <Text style={styles.mainTotal}> {total}.0 $</Text>
            </View>
            <View style={{ marginTop: 30 }}>
              {isLoggedIn ? (
                <Button
                  style={styles.button2}
                  onPress={() => {
                    Buy();
                  }}
                >
                  Buy
                </Button>
              ) : (
                <>
                  <Button
                    style={styles.button2}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Buy
                  </Button>
                </>
              )}
            </View>
          </>
        ) : (
          <View style={{ marginLeft: "40%", marginVertical: "65%" }}>
            <FontAwesome name="shopping-basket" size={100} color={"red"} />
            <Text color={"red"} style={{ marginLeft: 15, fontWeight: "bold" }}>
              Cart is Empty
            </Text>
          </View>
        )}
      </>
    );
  }

  function renderItem({ item }) {
    return (
      <>
        {item.qty > 0 ? (
          <View style={{ marginTop: -10, backgroundColor: "#fff" }}>
            <View style={styles.cartLine}>
              <Image style={styles.image} source={{ uri: item.data.IMG }} />
              <Text style={styles.lineLeft}>
                {item.data.name} x {item.qty}{" "}
                <Text style={styles.productTotal}>${item.data.price}</Text>
              </Text>
              <View
                style={{
                  marginTop: 40,
                  marginLeft: -190,
                  flexDirection: "row",
                  marginBottom: -1,
                }}
              >
                <Button
                  style={styles.button}
                  marginRight={20}
                  onPress={() => onAddToCart(item.id)}
                >
                  +
                </Button>
                <Button
                  style={styles.button}
                  onPress={() => deleteFromCart(item.id)}
                >
                  -
                </Button>
              </View>
            </View>
          </View>
        ) : (
          <Text></Text>
        )}
      </>
    );
  }

  return (
    <FlatList
      style={styles.itemsList}
      contentContainerStyle={styles.itemsListContainer}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.data.uid}
      ListFooterComponent={Totals}
    />
  );
}

const styles = StyleSheet.create({
  cartLine: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    borderColor: "#eeeeee",
    borderBottomColor: "red",
    borderWidth: 3,
  },
  image: {
    width: "25%",
    aspectRatio: 1,
    marginRight: 5,
  },
  cartLineTotal: {
    flexDirection: "row",
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
  },
  productTotal: {
    fontWeight: "bold",
  },
  lineTotal: {
    fontWeight: "bold",
  },
  lineLeft: {
    fontSize: 20,
    lineHeight: 40,
    color: "#333333",
    paddingHorizontal: 15,
  },
  lineRight: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "left",
  },
  mainTotal: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
    color: "#333333",
    textAlign: "right",
  },
  itemsList: {
    backgroundColor: "#eeeeee",
  },
  itemsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: "red",
    marginRight: "-15%",
    marginLeft: "25%",
    marginTop: 4,
    marginBottom: 30,
  },
  button2: {
    alignItems: "center",
    backgroundColor: "red",
  },
  delete: {
    alignItems: "center",
    backgroundColor: "#4c7cff",
    marginTop: 4,
    marginBottom: 30,
    marginLeft: 27,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonnn: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#4c7cff",
  },
  buttonClose: {
    backgroundColor: "#000",
    borderRadius: 5,
    marginLeft: -30,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "#000",
  },
});
