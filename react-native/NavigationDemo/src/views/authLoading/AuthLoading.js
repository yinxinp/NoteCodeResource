import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet
} from "react-native";

export default class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAnsyc();
  }
  _bootstrapAnsyc = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
