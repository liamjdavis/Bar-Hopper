import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';

import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png')

const Home = () => {
    return (
        <View style={styles.container}>
            <Text> Profile </Text>
        </View>
    );
};

export default Home;