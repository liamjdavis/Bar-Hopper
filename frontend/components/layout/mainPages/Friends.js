import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png')

const Friends = () => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {/* Logo */}
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.centerContainer}>
                {/* Bar Hopper Header */}
                <Text style={styles.headerText}>Bar Hopper</Text>

                {/* Search People */}
                {/* Search Bar */}
                <TextInput
                    style={styles.input}
                    placeholder="Search People"
                    onSubmitEditing={({ nativeEvent: { text } }) => {
                        console.log('Person Searched:  ', text);
                        // call function for submission
                    }}
                />

                {/* Friends List */}
                <Text style={styles.subHeaderText}>Friends</Text>
            </View>
        </View>
    );
};

export default Friends;