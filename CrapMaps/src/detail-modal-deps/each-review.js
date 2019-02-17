import {Text, View} from "react-native";
import StarRating from "react-native-star-rating";
import CMButton from "../CMButton";
import React, {Component} from "react";

export default class EachReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }


    render() {
        return (
            <View style={{
                width: "100%",
                backgroundColor: '#B0BEC5',
                flexDirection: "column",
                // justifyContent: "space-around",
                // alignItems: "center",
                padding: 20
            }}>

                <View style={{
                    // alignItems: "",
                    textAlign: "right",
                    width: "25%"
                }}>
                </View>
                <StarRating
                    disabled={true}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    rating={this.props.review.stars}
                    selectedStar={() => {
                    }}
                    fullStarColor={'#FFF176'}
                    starSize={20}
                    containerStyle={{justifyContent: "flex-start"}}
                />

                <View
                    style={{

                    }}>
                    <Text>{this.props.review.review}</Text>
                </View>

            </View>
        )
    }
}
