import React, { Component } from "react";
import { View, Button, AsyncStorage } from "react-native";

export default class Home extends Component {
  static navigationOptions = {
    title: "欢迎来到Home"
  };
  constructor(props) {
    super(props);
  }
  _signOutAsync = () => {
    AsyncStorage.clear(() => {
      this.props.navigation.navigate("Auth");
    });
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="go to Detial"
          onPress={() => {
            this.props.navigation.navigate("Detail");
          }}
        />
        <Button
          title="show more ..."
          onPress={() => {
            this.props.navigation.navigate("Other");
          }}
        />
        <Button
          title="登出"
          onPress={() => {
            this._signOutAsync();
          }}
        />
      </View>
    );
  }
}
