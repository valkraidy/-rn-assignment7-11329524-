import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleAddToCart = (item, cart, state) => {
  const itemExists = cart.some((cartItem) => cartItem.id === item.id);
  if (!itemExists) {
    const updatedCart = [...cart, item];
    state(updatedCart);
  }
};
export default function HomeScreen() {
  const navigation = useNavigation();
  const [Cart, setCart] = React.useState([]);
  const [tempCart, setTempCart] = React.useState([]);
  const [data, setData] = React.useState([]);

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

  useEffect(() => {
    const getdata = async () => {
      const res = await fetch("https://fakestoreapi.com/products?limit=14");
      try {
        const response = await res.json();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    getdata();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData("Cart").then((data) => {
        setCart(data || []);
      });
    }, [])
  );

  useEffect(() => {
    if (tempCart.length > 0) {
      storeData("Cart", tempCart);
      setCart(tempCart);
    }
  }, [tempCart]);

  const renderItem = ({ item }) => (
    <View
      style={{
        width: "47%",
        margin: 5,
        borderRadius: 10,
        padding: 5,
      }}
    >
      <Pressable
        onPress={() => {
          navigation.navigate("ProductDetailsScreen", {
            product: item,
          });
        }}
      >
        <View style={{ width: "100%", height: 200 }}>
          <ImageBackground
            resizeMode="contain"
            source={{ uri: item.image }}
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
              height: 200,
            }}
          >
            <Pressable onPress={() => handleAddToCart(item, Cart, setTempCart)}>
              <Image style={{ margin: 5 }} source={Images.add_circle} />
            </Pressable>
          </ImageBackground>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>{item.title}</Text>
          <Text>{item.category}</Text>
          <Text style={{ fontSize: 18, color: "orange" }}>
            ${Math.floor(item.price)}
          </Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image source={Images.Menu} />
          </Pressable>
          <Image source={Images.Logo} />
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Image source={Images.Search} />
            <Pressable onPress={() => navigation.navigate("CheckoutScreen")}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={Images.shoppingBag}
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>OUR STORY</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                padding: 10,
                backgroundColor: "#F9F9F9",
                borderRadius: 50,
              }}
            >
              <Image source={Images.Listview} />
            </View>
            <View
              style={{
                padding: 10,
                backgroundColor: "#F9F9F9",
                borderRadius: 50,
              }}
            >
              <Image source={Images.Filter} />
            </View>
          </View>
        </View>
        <FlatList
          style={{
            width: "100%",
          }}
          contentContainerStyle={{
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
