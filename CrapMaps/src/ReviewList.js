import {Text, View, FlatList} from "react-native";
import React, { Component } from "react";

export default class ReviewList extends Component{
  render(){
    return (<FlatList
      data={this.props.data}
      renderItem={(item)=>(<View review={item}/>)}
    />);
  }
}