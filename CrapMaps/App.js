import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

class Greeting extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text>Hello {this.props.name}!</Text>
            </View>
        );
    }
}

import MapView from 'react-native-maps'
export default class App extends Component<Props> {
    render() {
        return (
            <MapView
                style={{flex: 1}}
                region={{
                    latitude: 42.882004,
                    longitude: 74.582748,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                showsUserLocation={true}
            />
        );
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => LotsOfGreetings);
