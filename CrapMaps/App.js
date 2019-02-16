import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableWithoutFeedback, Button } from 'react-native';

import MapView,{Marker} from 'react-native-maps'
import StarRating from 'react-native-star-rating';

import CMButton from "./src/CMButton"
import MenuBar from "./src/MenuBar"
import MarkerData from "./src/MarkerData";
import "firebase"
import * as firebase from "firebase";

export default class App extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      markerView:false,
        currentPos:[0,0]
    };
    this.updateUserLocation();

    let config = {
      apiKey: "AIzaSyAu3t1RP8eCeDyLex1nUnOgLuxevRLC1Xc",
      authDomain: "crapmapsfb.firebaseapp.com",
      databaseURL: "https://crapmapsfb.firebaseio.com",
      projectId: "crapmapsfb",
      storageBucket: "crapmapsfb.appspot.com",
      messagingSenderId: "181590936130"
    };
    firebase.initializeApp(config);
  }

    updateUserLocation(){
        navigator.geolocation.getCurrentPosition((pos)=>{
            this.setState({currentPos:[pos.coords.latitude, pos.coords.longitude]})
        })

    }

    findClosest(listo){

        var i;
        var min = -1;
        var closest;
        for (i = 0; i < listo.length; i++) {
            if(min === -1){
                min = App.haversine(this.state.currentPos[0], this.state.currentPos[1], listo[i].latitude, listo[i].longitude);
                closest = listo[i];
            }else{
                if(App.haversine(this.state.currentPos[0], this.state.currentPos[1], listo[i].latitude, listo[i].longitude) < min){
                    min = App.haversine(this.state.currentPos[0], this.state.currentPos[1], listo[i].latitude, listo[i].longitude);
                    closest = listo[i];
                }
            }
        }
        return closest;


    }
    static haversine(lat1, long1, lat2, long2){
      const dlat = (lat2 - lat1) * Math.PI/180;
      const dlon = (long2-long1) * Math.PI/180;
      let a = Math.pow( (Math.sin(dlat/2)),2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.pow(Math.sin(dlon/2),2);
      let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
      return c;
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
                  this.setState({markerView: false})
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
