import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from '../actions/types';

import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    token: null,
    isAuthenticated: null,
    loading: true,
    user: null
};

// Helper function to get the token from AsyncStorage
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
    return token;
    } catch (error) {
        return null;
    }
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', payload);
            return {
            ...state,
            token: payload,
            isAuthenticated: true,
            loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case CLEAR_PROFILE:
            AsyncStorage.removeItem('token');
            return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null
            };
        default:
            return state;
        }
}
