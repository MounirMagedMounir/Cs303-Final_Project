import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,RefreshControl,
  ScrollView,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
const Cart = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView >
    <ScrollView
    
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
<Text>cart</Text>
</ScrollView>
    </SafeAreaView>
  )
}

export default Cart