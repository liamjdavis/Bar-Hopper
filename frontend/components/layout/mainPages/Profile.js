import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconContext } from '../IconContext';
import { ProfileContext } from '../ProfileContext';

import { useNavigation } from '@react-navigation/native';

import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png')

const Profile = () => {
    const navigation = useNavigation();

    // Use the contexts
    const profilePicture = useContext(IconContext);
    const profile = useContext(ProfileContext);

    // State for user type
    const [userType, setUserType] = useState('');

    // Fetch user type from AsyncStorage
    useEffect(() => {
        const fetchUserType = async () => {
            const type = await AsyncStorage.getItem('userType');
            console.log('User Type: ', type);
            setUserType(type);
        };

        fetchUserType();
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

    // Placeholder function for handling profile picture change
    const handleChangeProfilePicture = () => {
        const options = {
            title: 'Select Profile Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        // Use launchImageLibrary
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.assets[0].base64 };

                // Here, you might want to upload the image to your server,
                // or directly set the state to display the selected image on the page.
                console.log(source);
            }
        });
    };

    console.log('Profile: ', profile);

    return (
        <View style={styles.profilePageContainer}>
            {/* Profile Picture */}
            <TouchableOpacity style={styles.profilePictureContainer} onPress={handleChangeProfilePicture}>
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