import React, { Component } from "react";
import {Text, View, StyleSheet} from "react-native";


export default class DetailModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            titleText: "Big Papa's Testerino",
        };
    }

    render() {
        return (<Text style={styles.baseText}>
                <Text style={styles.titleText}>
                    {this.state.titleText}{'\n'}{'\n'}
                </Text>
            </Text>
            
        );
    }

}
const styles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

