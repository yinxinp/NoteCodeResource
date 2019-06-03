import React, { Component } from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Home</Text>
  </View>
);

const SettingScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Settings</Text>
  </View>
);
const defaultNavigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ focused, tintColor }) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === "Home") {
      iconName = `ios-information-circle${focused ? "" : "-outline"}`;
    } else if (routeName === "Settings") {
      iconName = `ios-options`;
    }

    return <IconComponent name={iconName} size={25} color={tintColor} />;
  },
  tabBarOptions: {
    activTintColor: "tomato",
    inactiveTintColor: "gray"
  }
});
const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingScreen
  },
  { defaultNavigationOptions }
);
export default createAppContainer(TabNavigator);
