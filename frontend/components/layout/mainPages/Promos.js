import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png')

const Promos = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {/* Logo */}
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.centerContainer}>
                {/* Bar Hopper Header */}
                <Text style={styles.headerText}>Bar Hopper</Text>

                {/* Promotions Title */}
                <Text style={styles.subHeaderText}>Promotions</Text>

                {/* Search Bar */}
                <TextInput
                    style={styles.input}
                    placeholder="Search by Bar"
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                        console.log('Bar Searched:  ', text);
                        // call function for submission
                    }}
                />

                {/* Promotions  Posts*/}
            </View>
        </View>
    );
};

export default Promos;