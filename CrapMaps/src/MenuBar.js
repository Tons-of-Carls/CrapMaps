import CMButton from "./CMButton";
import {View} from "react-native";
import React, { Component } from "react";


export default class MenuBar extends Component{
  render(){
    return (
      <View style={{ width: "100%", backgroundColor: '#e1e1e1', flexDirection: "row", justifyContent: "space-evenly"}}>
        {/*<CMButton verticallyAlone={true} bgColor="#B0BEC5" title="Sort" onPress={()=>{
        this.props.sortCallback()
      }}/>*/}
      <CMButton verticallyAlone={true} bgColor="#90A4AE" title="Emergency" onPress={()=>{
        this.props.emergencyCallback()
      }}/>
        {/*<CMButton verticallyAlone={true} bgColor="#B0BEC5" title="Add" onPress={()=>{
        this.props.addCallback()
      }}/>*/}
    </View>
    );
  }
}