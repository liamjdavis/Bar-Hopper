import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconContext } from '../IconContext';
import { ProfileContext } from '../ProfileContext';
import { useNavigation } from '@react-navigation/native';
import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png')

const Profile = () => {
    const navigation = useNavigation();

    // Use the contexts
    const profilePictureContext = useContext(IconContext);
    const profile = useContext(ProfileContext);

    // State for user type
    const [userType, setUserType] = useState('');
    const [profilePicture, setProfilePicture] = useState(profilePictureContext);

    // Fetch user type from AsyncStorage
    useEffect(() => {
        const fetchUserType = async () => {
            const type = await AsyncStorage.getItem('userType');
            console.log('User Type: ', type);
            setUserType(type);
        };

        fetchUserType();
    }, []);

    // Request permissions
    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    // Logout handler
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        // Navigate to login screen
        navigation.navigate('Landing');
    };

    const handleChangeProfile = () => {
        // Handle profile change logic here
        console.log('Change Profile');
        navigation.navigate('ChangeProfile');
    };

    // Handle profile picture change
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePicture({ uri: result.assets[0].uri });
        }
    };

    console.log('Profile: ', profile);

    return (
        <View style={styles.profilePageContainer}>
            {/* Profile Picture */}
            <TouchableOpacity style={styles.profilePictureContainer} onPress={pickImage}>
                <Image source={profilePicture} style={styles.profilePicture} />
            </TouchableOpacity>

            {/* Change Profile Button */}
            <TouchableOpacity style={styles.changeProfileButton} onPress={handleChangeProfile}>
                <Text style={styles.changeProfileButtonText}>Change Profile</Text>
            </TouchableOpacity>

            {/* Profile Attributes */}
            <View style={styles.profileAttributesContainer}>
                <Text style={styles.attributeText}>Name: {profile.name}</Text>
                {userType === 'user' && (
                    <>
                        <Text style={styles.attributeText}>Bio: {profile.bio}</Text>
                    </>
                )}
                {userType === 'bar' && (
                    <>
                        <Text style={styles.attributeText}>Location: {profile.location}</Text>
                        <Text style={styles.attributeText}>Hours: {profile.hours}</Text>
                    </>
                )}
            </View>

            <View>
                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Profile;