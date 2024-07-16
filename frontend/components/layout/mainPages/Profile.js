import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IconContext } from '../IconContext';
import { ProfileContext } from '../ProfileContext';

import styles from './mainPage_Styles';

const Profile = () => {
    // Use the contexts
    const profilePicture = useContext(IconContext);
    const profile = useContext(ProfileContext);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {/* Logo */}
                <Image source={profilePicture} style={styles.logo} />
            </View>

            <View style={styles.centerContainer}>
                <Text style={styles.headerText}>Profile</Text>

                {/* Profile Picture */}
                <Image source={profilePicture} style={styles.profilePicture} />

                {/* Profile Attributes */}
                <Text>Name: {profile.name}</Text>
                {/* Add more attributes as needed */}
            </View>
        </View>
    );
};

export default Profile;