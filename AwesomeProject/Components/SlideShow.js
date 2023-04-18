import React, { useRef } from "react";
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
} from "react-native";
import {useNavigation} from '@react-navigation/native';
export default function SlideShow({ Imgurl, CatName }) {
  const { width: windowWidth } = useWindowDimensions();
  const navigation=useNavigation();
  return (
    <View>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.scrollContainer1}>
            <TouchableOpacity style={{ marginRight: -340 }}>
              <Text style={styles.scrollHead}>{CatName}</Text>
            </TouchableOpacity>
            <ScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={1}
            >
              {Imgurl.map((image, imageIndex) => {
                return (
                  <View>
                    <TouchableOpacity
                      key={imageIndex}
                      onPress={() => navigation.navigate("Login")}
                    >
                      <View
                        style={{ width: windowWidth - 300, height: 250 }}
                        key={imageIndex}
                      >
                        <ImageBackground
                          source={{ uri: image }}
                          style={styles.card}
                        >
                          <Text>{CatName}</Text>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
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
    height: 250,
    width: 400,
    marginBottom: 10,
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
    backgroundColor: "red",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollHead: {
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
  },
});
