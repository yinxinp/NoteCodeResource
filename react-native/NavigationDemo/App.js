import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconWithBadge from "./src/components/iconWithBadge/IconWithBadge";
import DetailScreen from "./src/views/detail/Detail";
import HomeScreen from "./src/views/home/Home";
import SettingScreen from "./src/views/settings/Settings";
import AuthLoadingScreen from "./src/views/authLoading/AuthLoading";
import SignScreen from "./src/views/sign/Sign";
import OtherScreen from "./src/views/other/Other";
const HomeIconWithBadge = props => {
  return <IconWithBadge {...props} badgeCount={3} />;
};

const defaultNavigationOptions = ({ navigation }) => ({
  tabBarIcon: ({ focused, tintColor }) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === "Home") {
      iconName = `ios-information-circle${focused ? "" : "-outline"}`;
      IconComponent = HomeIconWithBadge;
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
const HomeStack = createStackNavigator(
  { Home: HomeScreen, Detail: DetailScreen, Other: OtherScreen },
  { initialRouteName: "Home" }
);
const SettingStack = createStackNavigator(
  { Settings: SettingScreen, Detail: DetailScreen },
  { initialRouteName: "Settings" }
);
const AppStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingStack
  },
  { defaultNavigationOptions }
);
const AuthStack = createStackNavigator({ Sign: SignScreen });
const AppContainer = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack
  },
  { initialRouteName: "AuthLoading" }
);

export default createAppContainer(AppContainer);
