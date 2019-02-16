import {Text, TouchableWithoutFeedback, View} from "react-native";
import React, { Component } from "react";

export default class CMButton extends Component{
  render(){
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}>
        <View
          style={{
            flex:this.props.verticallyAlone ? 1 : 0,
            alignItems: "center",
            backgroundColor: this.props.bgColor,
            elevation: 4,
            borderRadius: 2,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              padding: 8,
              fontWeight: '500',
            }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}