import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';

const Navbar = () => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const { isAuthenticated, loading } = auth;

    const onLogout = e => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/map">Map</Link></li>
                <li><Link to="/friends">Friends</Link></li>
                <li><Link to="/promotions">Promotions</Link></li>
            </ul>
            {/* <button onClick={onLogout}>
                <img src="/path/to/profile/image" alt="Profile" />
            </button> */}
        </nav>
    );
};

export default Navbar;
