import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/LOGO2.png';
// import '../assets/css/styles.css';
import './dropdown.css';
import avatar from '../assets/avatar1.png';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { signout } from '../actions/authAction';

const Header = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector((state) => state.auth.authenticated);
    const user = useSelector((state) => state.auth.user);
    const [open, setOpen] = useState(false);

    const logout = () => {
        dispatch(signout());
    };

    const renderLoggedIn = () => (
        <li>
            <a>
                <span>{user.fullName}</span> <img src={avatar} style={{ width: '50px', height: '50px' }} />
                <ArrowDropDownIcon style={{ color: 'black', cursor: 'pointer' }} onClick={
                    () => setOpen((prev) => !prev)
                } />
                {open && (
                    <div className="flex flex-col dropDownProfile" style={{marginTop: '-1rem'}}>
                        <ul className="flex flex-col-gap-4">
                            <li>
                                <button style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </a>
        </li>

    );

    const renderNonLoggedIn = () => (
        <li className="btn-cta">
            <a href="/">
                <span>Login</span>
            </a>
        </li>
    );

    return (
        <>
            <div>
                <nav className="fh5co-nav" role="navigation">
                    <div className="top-menu">
                        <div className="container">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                <div className="col-xs-2">
                                    <div>
                                        <a href="/">
                                            <img src={logo} style={{ width: '300px', height: '110px' }} alt="logo" />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xs-10 text-right menu-1">
                                    <ul>
                                        <li>
                                            <a href="/home">Home</a>
                                        </li>
                                        <li>
                                            <a href="/topup">Top Up</a>
                                        </li>
                                        <li>
                                            <a href="/userJourney">User Journey</a>
                                        </li>
                                        <li>
                                            <a href="/claim">Smart Card</a>
                                        </li>
                                        {authenticated ? renderLoggedIn() : renderNonLoggedIn()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Header;
