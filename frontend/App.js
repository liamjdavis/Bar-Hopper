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

import NavBar, { IconProvider } from './components/layout/NavBar';

const Stack = createStackNavigator();

const MainTabNavigator = () => {
    return (
        <IconProvider>
            <NavBar />
        </IconProvider>
    )
}

const App = () => {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                    <Stack.Screen name="MainTabs" component={MainTabNavigator} />
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