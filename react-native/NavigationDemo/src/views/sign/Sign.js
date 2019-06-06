import React, { Component } from "react";
import { Button, View, AsyncStorage } from "react-native";

export default class Sign extends Component {
  static navigationOptions = {
    title: "请登录"
  };
  constructor(props) {
    super(props);
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "test");
    this.props.navigation.navigate("App");
  };
  render() {
    return (
      <View>
        <Button
          title="登录"
          onPress={() => {
            this._signInAsync();
          }}
        />
      </View>
    );
  }
}
