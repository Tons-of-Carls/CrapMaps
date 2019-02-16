import {Text, View, TextInput} from "react-native";
import StarRating from "react-native-star-rating";

import React, { Component } from "react";

export default class BathroomDataCollection extends Component{

  constructor(props){
    super(props);
    this.state = {
      name: "",
      location: [0,0],
      rating: 0,
      review: ""
    }
    navigator.geolocation.getCurrentPosition((pos)=>{
      this.setState({location:[pos.coords.latitude, pos.coords.longitude]})
    })
  }

  render() {

    return (
      <View
        style={{
          width: "100%",
          backgroundColor: '#cfdee5',
          flexDirection: "column",
          height: "100%",
          justifyContent:"space-around",
          alignItems:"center",
          padding:20
        }}
      >

        <TextInput
          style={{flex: 1, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(val)=>{
            this.setState({name: val});
          }}
          value={this.state.name}
        />

        <StarRating
          disabled={false}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          rating={this.state.rating}
          selectedStar={(val) => {this.setState({rating: val})}}
          fullStarColor={'#FFF176'}
          starSize={50}
          containerStyle={{justifyContent: "center"}}
        />

        <TextInput
          onChangeText={(val)=>{
            this.setState({review: val});
          }}
          value={this.state.review}
          multiline={true}
        />

      </View>
    );
  }
}