import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableWithoutFeedback, Button } from 'react-native';

class Greeting extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text>Hello {this.props.name}!</Text>
            </View>
        );
    }
}


class CMButton extends Component{
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

import MapView,{Marker} from 'react-native-maps'
import StarRating from 'react-native-star-rating';
export default class App extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      starCount: 2.2,
      markerView:false
    }
  }


    render() {
        return (
          <View style={{width: "100%", height: "100%"}}>
            <MapView
                style={{flex: 1}}
                region={{
                    latitude: 33.6405,
                    longitude: -117.8443,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004
                }}
                showsUserLocation={true}
                onPress={()=>{
                  this.setState({markerView: false})
                }}
            >
              <Marker
                coordinate={{
                  latitude: 33.6405,
                  longitude: -117.8443
                }}
                onPress={()=>{
                  this.setState({markerView: true})
                }}
              />

              <Marker
                coordinate={{
                  latitude: 33.6400,
                  longitude: -117.8440
                }}
                onPress={()=>{
                  this.setState({markerView: true})
                }}
              />

            </MapView>

            {!this.state.markerView ? <View style={{ width: "100%", backgroundColor: '#e1e1e1', flexDirection: "row", justifyContent: "space-evenly"}}>
              <CMButton verticallyAlone={true} bgColor="#B0BEC5" title="Sort" onPress={()=>{}}/>
              <CMButton verticallyAlone={true} bgColor="#90A4AE" title="Emergency" onPress={()=>{}}/>
              <CMButton verticallyAlone={true} bgColor="#B0BEC5" title="Add" onPress={()=>{}}/>
            </View> :

            <View style={{
              width: "100%",
              backgroundColor: '#B0BEC5',
              flexDirection: "column",
              height: "40%",
              justifyContent:"space-around",
              alignItems:"center",
              padding:20
            }}>

              <View style={{
                alignItems:"center"
              }}>
                <Text>NAME</Text>
                <Text>Address</Text>
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

              <CMButton
                title="Details"
                verticallyAlone={false}
                bgColor="#546E7A"
              />

            </View>}

          </View>
        );
    }
}




// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);
