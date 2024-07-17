import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const UserRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const onChange = (field, value) => {
        if (field === 'name') setName(value);
        else if (field === 'email') setEmail(value);
        else if (field === 'password') setPassword(value);
    };

    const onSubmit = async () => {
        try {
            let response = await fetch('http://172.27.64.1:8000/api/users', {  // Update with your backend URL
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    user_type: 'user'  // Ensure you include user_type if required by your backend
                }),
            });

            let json = await response.json();
            console.log("JSON response:", json);

            if (response.status === 201) {
                // Registration successful
                console.log("Registration Successful");

                // Store the token in AsyncStorage
                await AsyncStorage.setItem('userToken', json.token);

                // Optionally, you can navigate to another screen or dispatch a success action
                navigation.navigate('MainTabs');
            } else {
                // Registration failed
                console.log("Registration failed", json);
                // Optionally, dispatch a failure action or display an alert
            }
        } catch (error) {
            console.error(error);
            // Handle network error or other exceptions
        }
    };

    return (
        <View style={styles.container}>
            {/* Screen Title */}
            <View style={styles.header}>
                <Text style={styles.headerText}>User Register</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(value) => onChange('name', value)}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(value) => onChange('email', value)}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(value) => onChange('password', value)}
                value={password}
                secureTextEntry
            />
            <Button
                title="Register"
                onPress={onSubmit}
                disabled={!name || !email || !password}
            />
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

export default UserRegister;
