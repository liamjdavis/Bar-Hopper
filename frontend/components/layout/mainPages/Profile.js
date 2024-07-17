import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IconContext } from '../IconContext';
import { ProfileContext } from '../ProfileContext';

import styles from './mainPage_Styles';

const logo = require('../../../assets/logo.png')

const Profile = () => {
    // Use the contexts
    const profilePicture = useContext(IconContext);
    const profile = useContext(ProfileContext);

    console.log('Profile: ', profile);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {/* Logo */}
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.centerContainer}>
                <Text style={styles.headerText}>Profile</Text>

                {/* Profile Picture */}
                <Image source={profilePicture} style={styles.profilePicture} />

                {/* Profile Attributes */}
                <Text>Name: {profile.name}</Text>
                <Text>Bio: {profile.bio}</Text>
            </View>
        </View>
    );
};

export default Profile;