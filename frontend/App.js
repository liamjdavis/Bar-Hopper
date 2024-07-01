import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './components/layout/Landing-Login';
import BarLogin from './components/auth/bar_login';
import UserLogin from './components/auth/user_login';
import Register from './components/auth/register';
import BarRegister from './components/auth/bar_register';
import UserRegister from './components/auth/user_register';

import Home from './components/layout/Home';
import Friends from './components/layout/Friends';
import Promos from './components/layout/Promos';

const Stack = createStackNavigator();

const App = () => {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Friends" component={Friends} />
                <Stack.Screen name="Promos" component={Promos} />
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="BarLogin" component={BarLogin} />
                <Stack.Screen name="UserLogin" component={UserLogin} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="BarRegister" component={BarRegister} />
                <Stack.Screen name="UserRegister" component={UserRegister} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;