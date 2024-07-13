import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CheckoutScreen() {
  const [Cart, setCart] = React.useState([]);
  const [sum, setSum] = React.useState(0);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Cart");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData("Cart").then((data) => {
        setCart(data || []);
      });
    }, [])
  );

  useEffect(() => {
    const calculateSum = () => {
      const total = Cart.reduce((acc, item) => acc + item.price, 0);
      setSum(total);
    };
    calculateSum();
  }, [Cart]);

  const handleRemoveFromCart = async (id) => {
    const updatedCart = Cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    await storeData("Cart", updatedCart);
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Image
          resizeMode="contain"
          style={{ width: 120, height: 180, marginRight: 10 }}
          source={{ uri: item.image }}
        />
        <View
          style={{
            flexDirection: "column",
            width: 135,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ fontSize: 16 }}>{item.category}</Text>
          <Text style={{ fontSize: 18, color: "#BAB02C" }}>${item.price}</Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Pressable onPress={() => handleRemoveFromCart(item.id)}>
              <Image style={{ width: 24, height: 24 }} source={Images.remove} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", padding: 20, paddingBottom: 110 }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View></View>
        <Image source={Images.Logo} />
        <Image source={Images.Search} />
      </View>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: 300 }}>CHECKOUT</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }}></View>
          <View
            style={{
              transform: [{ rotate: "45deg" }],
              width: 11,
              height: 11,
              borderColor: "black",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          ></View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }}></View>
        </View>
      </View>
      <FlatList
        style={{ flex: 1, paddingTop: 10 }}
        data={Cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: Dimensions.get("screen").width,
          height: 100,
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 18 }}>EST. TOTAL</Text>
          <Text style={{ fontSize: 20, color: "orange" }}>
            ${Math.floor(sum)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: 300 }}>
            CHECKOUT
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
