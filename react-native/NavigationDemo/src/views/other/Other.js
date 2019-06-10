import React, { Component } from "react";
import { Text, View, Button, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
const OtherTitle = props => <Button {...props} />;

export default class Other extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = "我是一个按钮地说";
    const color = "#407584";
    const onPress = navigation.getParam("localMethods", () => {
      console.log({ navigation });
    });
    return {
      headerTitle: <OtherTitle {...{ title, color, onPress }} />,
      headerRight: (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "orange",
            padding: 3,
            borderRadius: 3
          }}
        >
          <Ionicons name="ios-options" color="green" size={20} />
          <OtherTitle {...{ title: "R", onPress }} />
        </View>
      )
    };
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.navigation.setParams({ localMethods: this._localMethods });
  }
  _localMethods = () => {
    console.log("本页面", this);
    Alert.alert("本地方法被调用！");
  };

  render() {
    return (
      <View>
        <Text> Other app </Text>
      </View>
    );
  }
}
