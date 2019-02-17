import {Text, View, FlatList} from "react-native";
import React, { Component } from "react";
import EachReview from "./detail-modal-deps/each-review";

export default class ReviewList extends Component{
  render(){
    return (<FlatList
      style={{backgroundColor: "#B0BEC5"}}
      data={this.props.data}
      renderItem={(item)=>{
        return(<EachReview review={item.item}/>)
      }}
    />);
  }
}