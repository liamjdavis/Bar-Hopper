import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import defaultProfile from '../../assets/Default-Profile-Pic.png'; // Default profile picture

// Create a context for the icons
export const IconContext = createContext();

export const IconProvider = ({ children }) => {
    const [profilePicture, setProfilePicture] = useState(defaultProfile);

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                // Adjust the endpoint and headers as per your API setup
                const response = await axios.get('/api/profile-picture/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your authentication method
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