import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
import NavBar from './NavBar';

const Promos = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.headerText}>Promos</Text>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 50,
    },
    headerText: {
        fontSize: 48,
        marginTop: 20,
    },
    section: {
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 24,
        marginBottom: 10,
    },
    icon: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: 'black',
    },
    registerContainer: {
        position: 'absolute',
        bottom: 30,
        alignItems: 'center',
        padding: 10,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
    },
    registerText: {
        fontSize: 16,
        color: 'red',
    },
});

export default Promos;