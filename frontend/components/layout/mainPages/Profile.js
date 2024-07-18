import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconContext } from '../IconContext';
import { ProfileContext } from '../ProfileContext';

import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png')

const Profile = () => {
    // Use the contexts
    const profilePicture = useContext(IconContext);
    const profile = useContext(ProfileContext);

    // State for user type
    const [userType, setUserType] = useState('');

    // Fetch user type from AsyncStorage
    useEffect(() => {
        const fetchUserType = async () => {
            const type = await AsyncStorage.getItem('userType');
            setUserType(type);
        };

        fetchUserType();
    }, []);

    console.log('Profile: ', profile);

    return (
        <View style={styles.profilePageContainer}>
            {/* Profile Picture */}
            <View style={styles.profilePictureContainer}>
                <Image source={profilePicture} style={styles.profilePicture} />
            </View>

            {/* Profile Attributes */}
            <View style={styles.profileAttributesContainer}>
                <Text style={styles.attributeText}>Name: {profile.name}</Text>
                {userType === 'user' && <Text style={styles.attributeText}>Bio: {profile.bio}</Text>}
                {userType === 'bar' && (
                    <>
                        <Text style={styles.attributeText}>Location: {profile.location}</Text>
                        <Text style={styles.attributeText}>Hours: {profile.hours}</Text>
                    </>
                )}
            </View>
        </View>
    );
};

export default Profile;