import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Modal,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "Products"),
        where("name", ">=", searchText)
      );
      const querySnapshot = await getDocs(q);

      const results = querySnapshot.docs.map((doc) => doc.data());
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  const renderProductCard = ({ item }) => (
    <Card style={styles.card}>
      <TouchableOpacity
        style={{}}
        onPress={() =>
          navigation.navigate("ProductDetails", { productId: item.uid })
        }
      >
        <Card.Cover source={{ uri: item.IMG }} />
      </TouchableOpacity>
      <Card.Content>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{item.name}</Text>
        <Text style={{ fontSize: 17 }}>{item.description}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View>
      <View style={{ flexDirection: "row", marginLeft: 80 }}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Ionicons
          name="search"
          size={24}
          color="#929AAB"
          style={{ marginLeft: -36, marginRight: 15, marginTop: 8 }}
          onPress={handleSearch}
        />
      </View>

      <Modal
        visible={showResults}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowResults(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setShowResults(false)}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderProductCard}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          ) : (
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              No results found
            </Text>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  input: {
    width: "75%",
    height: "115%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCloseButton: {
    position: "relative",
    top: 10,
    right: 10,
    marginBottom: 20,
    marginTop: 6,
  },
  card: {
    marginVertical: 10,
    width: "45%",
    marginHorizontal: "2.5%",
  },
  card1: {
    width: "50%",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default Search;
