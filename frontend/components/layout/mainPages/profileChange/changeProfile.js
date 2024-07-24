import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileContext } from '../../ProfileContext';
import { useNavigation } from '@react-navigation/native';

const ChangeProfile = () => {
    const profile = useContext(ProfileContext);
    const navigation = useNavigation();
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

    // Fetch auth token from Async Storage
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        const fetchAuthToken = async () => {
            const token = await AsyncStorage.getItem('userToken');
            setAuthToken(token);
        };
        fetchAuthToken();
    }, []);

    // State for form inputs
    const [name, setName] = useState(profile?.name || '');
    const [bio, setBio] = useState(profile?.bio || '');
    const [location, setLocation] = useState(profile?.location || '');
    const [hours, setHours] = useState(profile?.hours || '');

    // Log profile data to check if it's loading
    useEffect(() => {
        console.log('Profile: ', profile);
    }, [profile]);

    // Handle form submission
    const handleSubmit = async () => {
        if (!profile) {
            console.log('Profile data not loaded yet');
            return;
        }

        const userId = profile.id;

        // Determine the correct endpoint based on user type
        const endpoint = userType === 'user' ? 'userprofile' : 'barprofile';

        // Prepare the updated profile data
        let updatedProfile = {};
        if (userType === 'user') {
            updatedProfile = {
                id: userId,
                name: name,
                bio: bio,
                user: profile.user
            };
        } else if (userType === 'bar') {
            updatedProfile = {
                id: userId,
                name: name,
                location: location,
                hours: hours,
                user: profile.user
            };
        }

        console.log("Updated Profile Data:", updatedProfile);

        try {
            let response = await fetch(`http://192.168.16.53:8000/api/${endpoint}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body: JSON.stringify(updatedProfile),
            });

            let json = await response.json();
            console.log("JSON response:", json);

            if (response.status === 200) {
                console.log("Profile Updated Successfully");
            } else {
                console.log("Profile Update Failed", json);
            }
        } catch (error) {
            console.error(error);
        }

        navigation.navigate('MainTabs');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            {userType === 'user' && (
                <>
                    <Text style={styles.label}>Bio:</Text>
                    <TextInput style={styles.input} value={bio} onChangeText={setBio} />
                </>
            )}

            {userType === 'bar' && (
                <>
                    <Text style={styles.label}>Location:</Text>
                    <TextInput style={styles.input} value={location} onChangeText={setLocation} />

                    <Text style={styles.label}>Hours:</Text>
                    <TextInput style={styles.input} value={hours} onChangeText={setHours} />
                </>
            )}

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
});

export default ChangeProfile;
