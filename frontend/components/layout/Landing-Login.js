import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Landing = ({ navigation }) => {
    // Bar Press
    const handleBarPress = () => {
        console.log('Bar Icon pressed!');
        navigation.navigate('BarLogin');
    };

    // User Press
    const handleUserPress = () => {
        console.log('User Icon pressed!');
        navigation.navigate('UserLogin');
    };

    // Register Press
    const handleRegisterPress = () => {
        console.log('Register pressed!');
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            {/* Screen Title */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Login</Text>
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

            {/* Register Button */}
            <TouchableOpacity onPress={handleRegisterPress} style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? Register here</Text>
            </TouchableOpacity>
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

export default Landing;