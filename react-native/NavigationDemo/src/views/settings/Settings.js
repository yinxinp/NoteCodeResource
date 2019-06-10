import React, { Component } from "react";
import { Button, View } from "react-native";

export default class Settings extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="go to detail"
          onPress={() => {
            this.props.navigation.navigate("Detail");
          }}
        />
      </View>
    );
  }
}
