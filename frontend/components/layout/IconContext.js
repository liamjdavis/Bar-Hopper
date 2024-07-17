import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultProfile from '../../assets/Default-Profile-Pic.png'; // Default profile picture

// Create a context for the icons
export const IconContext = createContext();

export const IconProvider = ({ children }) => {
    const [profilePicture, setProfilePicture] = useState(defaultProfile);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                // Get the token from AsyncStorage
                const token = await AsyncStorage.getItem('token');

                // Adjust the endpoint and headers as per your API setup
                const response = await axios.get('http://172.27.61.1:8000/api/profile-picture/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Replace with your authentication method
                    },
                });
                if (response.data.profile_picture) {
                    setProfilePicture({ uri: response.data.profile_picture });
                }
            } catch (error) {
                console.error('Error fetching profile picture', error);
            }
        };

        fetchProfilePicture();
    }, []);

    // Provide the profile picture to the children components
    return (
        <IconContext.Provider value={profilePicture}>
            {children}
        </IconContext.Provider>
    );
};