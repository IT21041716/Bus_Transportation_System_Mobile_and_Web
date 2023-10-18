import { authConstants } from './constants'

import { ToastAndroid } from 'react-native';
//working
export const Login = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.LOGIN_REQUEST })
            const response = await fetch('http://localhost:5005/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            if (res.status === 200) {
                const token = res.data.token
                const user = res.data.user

                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user));

                ToastAndroid.show(`Login Success, Welcome ${user.fullName}`, ToastAndroid.SHORT);

                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        user,
                        token
                    }
                })
            } else if (res.status === 404) {
                ToastAndroid.show(`Invalid Password..!`, ToastAndroid.SHORT);
                dispatch({
                    type: authConstants.LOGIN_ERROR
                })
            } else if (res.status === 405) {

                ToastAndroid.show('No user under this email..!', ToastAndroid.SHORT);
                dispatch({
                    type: authConstants.LOGIN_ERROR
                })
            }
        } catch (error) {

            ToastAndroid.show("somthing went wrong.!", ToastAndroid.SHORT);
            dispatch({ type: authConstants.LOGIN_ERROR })
        }
    }
}
//working
export const Register = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.SIGNUP_REQUEST })
            const response = await fetch('http://localhost:5005/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            if (res.status === 200) {
                dispatch({
                    type: authConstants.SIGNUP_SUCCESS,
                    payload: res.data.payload
                })
                ToastAndroid.show("Registration Succefull..!", ToastAndroid.SHORT);
            } else if (res.status === 404) {
                dispatch({
                    type: authConstants.SIGNUP_ERROR
                })
                ToastAndroid.show("Registration error..!", ToastAndroid.SHORT);
            } else if (res.status === 401) {
                dispatch({
                    type: authConstants.SIGNUP_ERROR
                })
                ToastAndroid.show("User already exist..!", ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show("Somthing went wrong..!", ToastAndroid.SHORT);
            dispatch({
                type: authConstants.SIGNUP_ERROR
            })
        }
    }
}


export const signout = () => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGOUT_REQUEST })
        localStorage.clear();

        ToastAndroid.show("Logout successfull..!", ToastAndroid.SHORT);
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        })


    }
}

//working
export const isLoggedIn = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user) {
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user
                    }
                })
            }
        } else {
            dispatch({
                type: authConstants.LOGIN_ERROR,
                payload: { error: 'Failed to login' }
            })
        }
    }
}


export const updateUserSmartCard = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.SMRT_CARD_UPDATE_REQUEST })
            const response = await fetch('http://localhost:5005/user/updateSmrtCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            if (res.status === 200) {
                dispatch({
                    type: authConstants.SMRT_CARD_UPDATE_SUCCESS,
                    payload: res.data.user
                })
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
            } else if (res.status === 401) {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
                dispatch({ type: authConstants.SMRT_CARD_UPDATE_ERROR })
            } else if (res.status === 400) {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
                dispatch({ type: authConstants.SMRT_CARD_UPDATE_ERROR })
            } else if (res.status === 405) {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
                dispatch({ type: authConstants.SMRT_CARD_UPDATE_ERROR })
            }
        } catch (error) {
            dispatch({ type: authConstants.SMRT_CARD_UPDATE_ERROR })
        }
    }
}