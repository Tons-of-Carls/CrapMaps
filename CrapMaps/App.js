import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableWithoutFeedback, Button } from 'react-native';

import MapView,{Marker} from 'react-native-maps'
import StarRating from 'react-native-star-rating';

import CMButton from "./src/CMButton"
import MenuBar from "./src/MenuBar"
import MarkerData from "./src/MarkerData";
import BathroomDataCollection from "./src/BathroomDataCollection"

import "firebase"
import * as firebase from "firebase";

export default class App extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      markerView:false,
      inputView: false,
      currentPos:[0,0],
      locations: []
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

    firebase.database().ref("locations/").once("value").then((snapshot)=>{
      console.log();
      this.setState({locations: Object.values(snapshot.toJSON())})
    })
  }

    updateUserLocation(){
        navigator.geolocation.getCurrentPosition((pos)=>{
            this.setState({currentPos:[pos.coords.latitude, pos.coords.longitude]})
        })

    }



    render() {


        return (
          <View>
            {this.state.inputView ?
              <BathroomDataCollection/> :
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

                {this.state.locations.map((markerInfo)=>(
                  <Marker
                    coordinate={{
                      latitude: markerInfo.lat,
                      longitude: markerInfo.long
                    }}
                    onPress={(event)=>{
                      this.setState({markerView: true,currentPos:[event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude]})
                    }}
                  />
                ))}

              </MapView>

              {!this.state.markerView ?
                <MenuBar
                  sortCallback={()=>{}}
                  emergencyCallback={()=>{}}
                  addCallback={()=>{this.setState({inputView: true})}
                  }/> :
                <MarkerData/>}

            </View>
            }
          </View>
        );
    }
}




// skip this line if using Create React Native App
//AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);
