import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShopStack from "./ShopStack";
import CartStack from "./CartStack";
import OrderStack from "./OrderStack";
import MyProfileStack from "./MyProfileStack";
import { colors } from "../global/colors";
import { StyleSheet, View, Text } from "react-native";
import { AntDesign, Feather, Octicons, FontAwesome } from "@expo/vector-icons";

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }}
        >
            <Tab.Screen
                name="ShopTab"
                component={ShopStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.barIcons}>
                                <AntDesign
                                    name="home"
                                    size={24}
                                    color={focused ? "white" : colors.unfocusse} />
                                <Text style={{ color: focused ? "white" : colors.unfocusse }}>Inicio</Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="CartTab"
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.barIcons}>
                                <Feather
                                    name="shopping-cart"
                                    size={24}
                                    color={focused ? "white" : colors.unfocusse} />
                                <Text style={{ color: focused ? "white" : colors.unfocusse }}>Carrito</Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="OrderTab"
                component={OrderStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.barIcons}>
                                <Octicons
                                    name="checklist"
                                    size={24}
                                    color={focused ? "white" : colors.unfocusse} />
                                <Text style={{ color: focused ? "white" : colors.unfocusse }}>Historial</Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={MyProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.barIcons}>
                                <FontAwesome
                                    name="user-o"
                                    size={24}
                                    color={focused ? "white" : colors.unfocusse} />
                                <Text style={{ color: focused ? "white" : colors.unfocusse }}>Perfil</Text>
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.blue,
        height: 70,
    },
    barIcons: {
        justifyContent: "center",
        alignItems: "center",
    },
});