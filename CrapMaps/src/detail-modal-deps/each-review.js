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
                height: "15%",
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
                    rating={this.props.review.starCount}
                    selectedStar={() => {
                    }}
                    fullStarColor={'#FFF176'}
                    starSize={10}
                    containerStyle={{justifyContent: "center"}}
                />

                <View
                    style={{

                    }}>
                    <Text>{this.props.review.reviewText}</Text>
                </View>

            </View>
        )
    }
}
