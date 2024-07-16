import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for the user profile
export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                // Adjust the endpoint and headers as per your API setup
                const response = await axios.get('172.27.61.1:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Replace with your authentication method
                    },
                });
                if (response.data) {
                    setProfile(response.data);
                }
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        fetchProfile();
    }, []);

    // Provide the profile to the children components
    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    );
};
