import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png');

const Friends = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const fetchUserType = async () => {
            const type = await AsyncStorage.getItem('userType');
            setUserType(type);
        };

        fetchUserType();
    }, []);

    const handleSearch = async (text) => {
        try {
            const response = await axios.get(`http://192.168.16.53:8000/api/userprofiles/?search=${text}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for users:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.centerContainer}>
                <Text style={styles.headerText}>Bar Hopper</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search People"
                    onSubmitEditing={({ nativeEvent: { text } }) => handleSearch(text)}
                />
                {userType === 'user' ? (
                    <>
                        <Text style={styles.subHeaderText}>Friends</Text>
                        {searchResults.map((user, index) => (
                            <Text key={index}>{user.name}</Text>
                        ))}
                    </>
                ) : (
                    <>
                        <Text style={styles.subHeaderText}>Followers</Text>
                        {searchResults.map((user, index) => (
                            <Text key={index}>{user.name}</Text>
                        ))}
                    </>
                )}
            </View>
        </View>
    );
};

export default Friends;
