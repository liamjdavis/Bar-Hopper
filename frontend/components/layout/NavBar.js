import React, { createContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

import map from '../../assets/map-logo.png';
import friends from '../../assets/friends-logo.png';
import promos from '../../assets/promos-logo.png';

import HomeScreen from './Home';
import FriendsScreen from './Friends';
import PromosScreen from './Promos';

const Tab = createBottomTabNavigator();

// Create a context for the icons
const IconContext = createContext();

export const IconProvider = ({ children }) => {
    const [icon, setIcon] = useState(null);

    return (
        <IconContext.Provider value={{ icon, setIcon }}>
            {children}
        </IconContext.Provider>
    );
};

export default function NavBar() {
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
                    }

                    return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} resizeMode="contain" />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: [{ display: 'flex' }, null],
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen name="Promos" component={PromosScreen} />
        </Tab.Navigator>
    );
}