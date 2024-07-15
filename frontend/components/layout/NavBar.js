import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import map from '../../assets/map-logo.png';
import friends from '../../assets/friends-logo.png';
import promos from '../../assets/promos-logo.png';

import HomeScreen from './mainPages/Home';
import FriendsScreen from './mainPages/Friends';
import PromosScreen from './mainPages/Promos';
import ProfileScreen from './mainPages/Profile'; // Import the Profile component

import { IconContext, IconProvider } from './IconContext'; // Import IconContext and IconProvider

const Tab = createBottomTabNavigator();

const NavBar = () => {
    const profilePicture = useContext(IconContext);

    // Tab Navigator setup
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    if (route.name === 'Home') {
                        iconSource = map;
                    } else if (route.name === 'Friends') {
                        iconSource = friends;
                    } else if (route.name === 'Promos') {
                        iconSource = promos;
                    } else if (route.name === 'Profile') {
                        iconSource = profilePicture; // Use the fetched profile picture or default profile picture
                    }

                    return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} resizeMode="contain" />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { display: 'flex' }, // Adjust styles as needed
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen name="Promos" component={PromosScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default NavBar;