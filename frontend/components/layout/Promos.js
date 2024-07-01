import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const logo = require('../../assets/logo.png')

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
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 3,
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
});

export default Promos;