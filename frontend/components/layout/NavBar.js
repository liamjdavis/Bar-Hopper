import React, { createContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { IonIcons } from '@expo/vector-icons';

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
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = map;
                    } else if (route.name === 'Friends') {
                        iconName = friends;
                    } else if (route.name === 'Promos') {
                        iconName = promos;
                    }

                    // You can now access the icon context using the useContext Hook
                    const { setIcon } = React.useContext(IconContext);
                    setIcon(iconName);

                    return <IonIcons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen name="Promos" component={PromosScreen} />
        </Tab.Navigator>
    );
}