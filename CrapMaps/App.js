import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableWithoutFeedback, Button } from 'react-native';

import MapView,{Marker} from 'react-native-maps'
import StarRating from 'react-native-star-rating';

import CMButton from "./src/CMButton"
import MenuBar from "./src/MenuBar"
import MarkerData from "./src/MarkerData";

export default class App extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      markerView:false,
        currentPos:[0,0]
    };
    this.updateUserLocation();

  }

    updateUserLocation(){
        navigator.geolocation.getCurrentPosition((pos)=>{
            this.setState({currentPos:[pos.coords.latitude, pos.coords.longitude]})
        })

    }



    render() {
        return (
          <View style={{width: "100%", height: "100%"}}>
            <MapView
                style={{flex: 1}}
                region={{
                    latitude: this.state.currentPos[0],
                    longitude: this.state.currentPos[1],
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004
                }}
                showsUserLocation={true}
                onPress={(newCoords)=>{
                  this.setState({markerView: false,currentPos:[newCoords.coordinate.latitude, newCoords.coordinate.longitude]})
                }}
            >
              <Marker
                coordinate={{
                  latitude: 33.6405,
                  longitude: -117.8443
                }}
                onPress={(event)=>{
                    this.setState({markerView: true,currentPos:[event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude]})
                }}
              />

              <Marker
                coordinate={{
                  latitude: 33.6400,
                  longitude: -117.8440
                }}
                onPress={(event)=>{
                    this.setState({markerView: true,currentPos:[event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude]})
                }}
              />

            </MapView>

            {!this.state.markerView ? <MenuBar/> : <MarkerData/>}

          </View>
        );
    }
}




// skip this line if using Create React Native App
//AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);
