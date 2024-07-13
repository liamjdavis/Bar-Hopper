import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png')

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {/* Logo */}
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.centerContainer}>
                {/* Bar Hopper Header */}
                <Text style={styles.headerText}>Bar Hopper</Text>

                {/* Text Input for Bar Location */}

                <TextInput
                    style={styles.input}
                    placeholder="What bar are you going to?"
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                        console.log('Bar Location Submitted: ', text);
                        // call function for submission
                    }}
                />

                {/* Map View */}
                <MapView style={styles.map}
                    initialRegion={{
                      latitude: 40.776676,
                      longitude: -73.971321,
                      latitudeDelta: 0.2,
                      longitudeDelta: 0.1,
                    }}
                />
            </View>

            <View style={styles.rightContainer}>
                {/* Profile Button */}
                <TouchableOpacity onPress={() => {
                    // Handle press
                }}>
                    <Icon name="profile" size={30} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;