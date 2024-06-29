import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email: ', email);
        console.log('Password: ', password);
        // Add your login logic here (e.g., API call)
    };

    return (
        <View style={styles.container}>
            {/* Screen Title */}
            <View style={styles.header}>
                <Text style={styles.headerText}>User Login</Text>
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

export default UserLogin;
