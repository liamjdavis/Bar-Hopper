import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for the user profile
export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log('Fetching Token')
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.log('No token found');
                }
                console.log('Token:', token);

                console.log('Fetching Profile');
                const response = await axios.get('http://172.27.64.1:8000/api/profile', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                console.log('Response:', response.data);

                if (response.data) {
                    console.log('Profile Data:', response.data);
                    setProfile(response.data);
                } else {
                    console.log('No profile data found');
                }
            } catch (error) {
                console.log('Error fetching profile', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    );
};
