import React, { Component } from "react";
import { Text, View, BackHandler, Alert } from "react-native";

export default class Detail extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = { isFirst: true };
    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        //注册路由进来时添加监听backhandler
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );

    //注册路由跳转走之后移除backhandler自定义事件
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
  }
  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  onBackButtonPressAndroid = () => {
    if (this.state.isFirst) {
      this.setState({ isFirst: false });
      Alert.alert("再点击一次返回退回");
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Details!</Text>
      </View>
    );
  }
}
