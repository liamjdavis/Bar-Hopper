import axios from "axios";
import { setAlert } from "./alert";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utils/setAuthToken";

/**
 * User Auth 
*/

// Load User
export const load_user = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/userauth");

        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

// Register User
export const register_user = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: { "Content-Type": "application/json" }
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post("/api/users", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data;

        if (errors["name"]) {
            errors["name"].forEach(msg =>
                dispatch(setAlert(`Name: ${msg}`, "danger"))
            );
        }

        if (errors["email"]) {
            errors["email"].forEach(msg =>
                dispatch(setAlert(`Email: ${msg}`, "danger"))
            );
        }

        if (errors["password"]) {
            errors["password"].forEach(msg =>
                dispatch(setAlert(`Password: ${msg}`, "danger"))
            );
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login User
export const login_user = (email, password) => async dispatch => {
    const config = {
        headers: { "Content-Type": "application/json" }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/userauth", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        });

        dispatch(loadUser());
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error, "danger"));

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Logout User
export const logout_user = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
};

/**
 * Bar Auth
*/

// Load Bar
export const load_bar = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get("/api/barauth");

        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

// Register Bar
export const register_bar = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: { "Content-Type": "application/json" }
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post("/api/bars", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data;

        if (errors["name"]) {
            errors["name"].forEach(msg =>
                dispatch(setAlert(`Name: ${msg}`, "danger"))
            );
        }

        if (errors["email"]) {
            errors["email"].forEach(msg =>
                dispatch(setAlert(`Email: ${msg}`, "danger"))
            );
        }

        if (errors["password"]) {
            errors["password"].forEach(msg =>
                dispatch(setAlert(`Password: ${msg}`, "danger"))
            );
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login Bar
export const login_bar = (email, password) => async dispatch => {
    const config = {
        headers: { "Content-Type": "application/json" }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/api/barauth", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        });

        dispatch(loadUser());
    } catch (err) {
        const error = err.response.data.error;

        dispatch(setAlert(error, "danger"));

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Logout User
export const logout_bar = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
};