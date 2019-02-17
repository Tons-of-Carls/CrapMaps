import {Text, View, KeyboardAvoidingView } from "react-native";
import StarRating from "react-native-star-rating";
import CMButton from "./CMButton";
import React, { Component } from "react";
import MakeReview from "./MakeReview";
import ReviewList from "./ReviewList";

export default class MarkerData extends Component{

  constructor(props){
    super(props);
    this.state = {
      starCount: this.props.locationData.rating,
      mainView: true,
      reviewView: true,
    }
  }

  mainV(){
    return (
      <KeyboardAvoidingView
        style={{
          width:"100%",
          height:"100%",
          backgroundColor: '#B0BEC5',
          flexDirection: "column",
          justifyContent:"space-around",
          alignItems:"center",
          padding:20,
        }}
      >

        <View style={{
          alignItems:"center"
        }}>
          <Text>{this.props.locationData.name}</Text>
          <Text>{this.props.locationData.address}</Text>
        </View>
        <StarRating
          disabled={true}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          rating={this.state.starCount}
          selectedStar={() => {}}
          fullStarColor={'#FFF176'}
          starSize={30}
          containerStyle={{justifyContent: "center"}}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent:"space-around"
          }}>
          <CMButton
            title="Add review"
            verticallyAlone={true}
            bgColor="#546E7A"
            onPress={()=>{
              this.setState({mainView: false, reviewView: false})
            }}
          />
          <CMButton
            title="Details"
            verticallyAlone={true}
            bgColor="#546E7A"
            onPress={()=>{
              this.setState({mainView: false, reviewView:true})
            }}
          />
        </View>

      </KeyboardAvoidingView >
    )
  }

  render(){
    return (
      <View
        style={{
          width: "100%",
          height: "40%",
        }}
      >
        {this.state.mainView ? this.mainV() : (this.state.reviewView ? <ReviewList data={Object.values(this.props.locationData.reviews)}/> : <MakeReview index={Object.values(this.props.locationData.reviews).length} data={this.props.locationData}/> )}
      </View>
    )
  }
}