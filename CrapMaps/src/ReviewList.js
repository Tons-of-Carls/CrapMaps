import {Text, View, FlatList} from "react-native";
import React, { Component } from "react";

export default class ReviewList extends Component{
  render(){
    <FlatList
      data={this.props.reviews}
      renderItem={(item)=>(<View/>)}
    />
  }
}