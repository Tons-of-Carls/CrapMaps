import "firebase"
import * as firebase from "firebase";

import React, { Component } from 'react';
import { AppRegistry, Text, View, TouchableWithoutFeedback, Button, Image, BackHandler } from 'react-native';

import MapView,{Marker} from 'react-native-maps'
import StarRating from 'react-native-star-rating';

import CMButton from "./src/CMButton"
import MenuBar from "./src/MenuBar"
import MarkerData from "./src/MarkerData";

import DetailModal from "./src/DetailModal"


let config = {
  apiKey: "AIzaSyAu3t1RP8eCeDyLex1nUnOgLuxevRLC1Xc",
  authDomain: "crapmapsfb.firebaseapp.com",
  databaseURL: "https://crapmapsfb.firebaseio.com",
  projectId: "crapmapsfb",
  storageBucket: "crapmapsfb.appspot.com",
  messagingSenderId: "181590936130"
};
firebase.initializeApp(config);

export default class App extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      markerView:-1,
      viewPos:[33.64866,-117.8428],
      userPos:[33.64866,-117.8428],
      locations: []
    };
    this.updateUserLocation();

      BackHandler.addEventListener('hardwareBackPress', ()=> {

          this.setState({markerView: -1});

          return true;

      });


      navigator.geolocation.getCurrentPosition((pos)=>{
      this.setState({viewPos:[pos.coords.latitude, pos.coords.longitude]})
    });

    firebase.database().ref("Locations/").once("value").then((snapshot)=>{
      this.setState({locations: Object.values(snapshot.toJSON())})
    });
    firebase.database().ref("Locations/").on("value",  (snapshot)=> {
      this.setState({locations: Object.values(snapshot.toJSON())})
    });
  }

    updateUserLocation(){
        navigator.geolocation.getCurrentPosition((pos)=>{
            this.setState({userPos:[pos.coords.latitude, pos.coords.longitude]})
        })

    }

    async findClosest(listo){
      await this.updateUserLocation();
        var index = 0;
        var i;
        var min = -1;
        var closest;
        for (i = 0; i < listo.length; i++) {
            if(min === -1){
                min = App.haversine(this.state.userPos[0], this.state.userPos[1], listo[i].latitude, listo[i].longitude);
                closest = listo[i];
                index = i;
            }else{
                if(App.haversine(this.state.userPos[0], this.state.userPos[1], listo[i].latitude, listo[i].longitude) < min){
                    min = App.haversine(this.state.userPos[0], this.state.userPos[1], listo[i].latitude, listo[i].longitude);
                    closest = listo[i];
                    index = i;
                }
            }
        }
        return index;


    }
    static haversine(lat1, long1, lat2, long2){
      const dlat = (lat2 - lat1) * Math.PI/180;
      const dlon = (long2-long1) * Math.PI/180;
      let a = Math.pow( (Math.sin(dlat/2)),2) + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.pow(Math.sin(dlon/2),2);
      let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
      return c;
    }



    render() {
      var toileticon = require('./splash.png');
      console.log(toileticon);
        return (
            <View style={{width: "100%", height: "100%"}}>
              <MapView
                  style={{flex: 1}}
                  region={{
                      latitude: this.state.viewPos[0],
                      longitude: this.state.viewPos[1],
                      latitudeDelta: 0.004,
                      longitudeDelta: 0.004
                  }}
                  showsUserLocation={true}
                  onPress={(newCoords)=>{
                    this.setState({markerView: -1})
                  }}
              >

                {this.state.locations.map((markerInfo, index)=>(
                  <Marker
                    coordinate={{
                      latitude: markerInfo.latitude,
                      longitude: markerInfo.longitude
                    }}
                    //image={require('./splash.png')}
                    image={toileticon}
                    onPress={(event)=>{
                      this.setState({markerView: index,viewPos:[event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude]})
                    }}
                  />
                ))}

              </MapView>

              {this.state.markerView === -1 ?
                <MenuBar
                  sortCallback={()=>{}}

                  emergencyCallback={()=>{
                      this.updateUserLocation();
                    let latlongs = [];
                    for(let i in this.state.locations){
                      latlongs.push({
                        latitude: this.state.locations[i].latitude,
                        longitude: this.state.locations[i].longitude,
                      })
                    }

                    this.findClosest(latlongs).then((index)=>{
                      this.setState({markerView: index,viewPos:[latlongs[index].latitude, latlongs[index].longitude]})
                    });



                  }}
                  addCallback={()=>{}}/> :
                <MarkerData
                  locationData={this.state.locations[this.state.markerView]}
                  index={this.state.markerView}
                  closeCallback={()=>{this.setState({markerView: -1})}}
                />}

            </View>
        );
    }
}




// skip this line if using Create React Native App
//AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);
