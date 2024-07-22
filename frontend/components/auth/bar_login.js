import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const BarLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        // Prepare the data to be sent
        const data = {
            email: email,
            password: password
        };

        // Make a POST request to the login endpoint
        fetch('http://192.168.16.53:8000/api/barauth', {  // Replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(async (data) => {
            if (data.token) {
                console.log('Login successful');

                // Save the token and other necessary user data
                // Store the token in AsyncStorage
                await AsyncStorage.setItem('userToken', data.token);
                await AsyncStorage.setItem('userType', 'bar');

                // Navigate to the next screen
                navigation.navigate('MainTabs');
            } else {
                console.log('Login failed');
                // Show an error message
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <View style={styles.container}>
            {/* Screen Title */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Bar Login</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },

    headerText: {
        fontSize: 48,
        marginTop: 20,
    },

    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#ddd',
        marginBottom: 10,
        padding: 10,
    },
});

export default BarLogin;