import { NavigationContainer } from "@react-navigation/native";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { Pressable, Text, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";

export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: {
            fontWeight: 300,
            fontSize: 24,
          },
        }}
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
                style={{ width: "100%", padding: 10, backgroundColor: "#fff" }}
              >
                <Pressable
                  onPress={() => {
                    props.navigation.closeDrawer();
                  }}
                >
                  <Text style={{ fontSize: 24 }}>
                    <Ionicons name="close" size={30} color="#000" />
                  </Text>
                </Pressable>
                <View
                  style={{
                    marginTop: 10,
                    width: 180,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 26, fontWeight: 300 }}>
                    ERIC ATSU
                  </Text>
                  <View
                    style={{
                      width: 180,
                      backgroundColor: "red",
                      height: 1.5,
                      marginVertical: 5,
                      alignSelf: "center",
                    }}
                  ></View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 24, fontWeight: 300 }}>Store</Text>
                  </View>
                </View>
                <View style={{ marginTop: 30 }}>
                  <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 24, fontWeight: 300 }}>
                      Locations
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 30 }}>
                  <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 24, fontWeight: 300 }}>Blog</Text>
                  </View>
                </View>
                <View style={{ marginTop: 30 }}>
                  <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 24, fontWeight: 300 }}>
                      Jewelery
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 30 }}>
                  <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 24, fontWeight: 300 }}>
                      Electronic
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 30 }}>
                  <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 24, fontWeight: 300 }}>
                      Clothing
                    </Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          );
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Drawer.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
