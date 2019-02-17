import {Text, View, TextInput, Alert} from "react-native";
import StarRating from "react-native-star-rating";
import CMButton from "./CMButton"
import React, { Component } from "react";

import * as firebase from "firebase";



export default class MakeReview extends Component{

  constructor(props){
    super(props);
    this.state = {
      rating: 0,
      review: ""
    };
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
          style={{width:"90%", borderBottomColor: "#78909C", borderBottomWidth: 1}}
          onChangeText={(val)=>{
            this.setState({review: val});
          }}
          value={this.state.review}
          multiline={true}
        />

        <CMButton
          title="Submit"
          verticallyAlone={false}
          bgColor="#546E7A"
          onPress={()=>{
            firebase.database().ref("Locations/"+this.props.data.parent + "/reviews/" + String(this.props.index + 1)).set({
              review: this.state.review,
              stars: this.state.rating
            });

            let updates = {};
            updates["Locations/"+this.props.data.parent+"/rating"] = (this.props.data.rating*this.props.data.size+this.state.rating)/(this.props.data.size+1);
            updates["Locations/"+this.props.data.parent+"/size"] = this.props.data.size+1

            firebase.database().ref().update(updates);

            this.setState({
              rating: 0,
              review: ""
            });
            this.props.closeCallback();
            Alert.alert(
              'Thank you for your feedback!',
              '',
              [
                {text: 'OK', onPress: () => {}},
              ],
              {cancelable: false},
            );
          }}
        />

      </View>
    );
  }
}