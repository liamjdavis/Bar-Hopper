import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Register = ({ navigation }) => {
    // Bar Press
    const handleBarPress = () => {
        console.log('Bar Icon pressed!');
        navigation.navigate('BarRegister');
    };

    // User Press
    const handleUserPress = () => {
        console.log('User Icon pressed!');
        navigation.navigate('UserRegister');
    };

    return (
        <View style={styles.container}>
            {/* Screen Title */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Register</Text>
            </View>

            {/* Bar Button */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>Bar</Text>
                <TouchableOpacity onPress={handleBarPress}>
                    <Image
                        source={require('../../assets/bar-icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            {/* User Button */}
            <View style={styles.section}>
                <Text style={styles.sectionHeader}>User</Text>
                <TouchableOpacity onPress={handleUserPress}>
                    <Image
                        source={require('../../assets/user-icon.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
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
        bottom: 50,
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

export default Register;