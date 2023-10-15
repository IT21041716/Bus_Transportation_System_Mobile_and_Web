import { authConstants } from './constants'
import { toast } from 'react-hot-toast'
import axios from 'axios'

export const Login = (data) => {
    return async (dispatch) => {
        try {

            dispatch({ type: authConstants.LOGIN_REQUEST })
            const res = await axios.post('http://localhost:5005/user/login', data)
            if (res.status === 200) {
                const token = user.data.token
                const user = user.data.user

                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user));

                toast.success(`Login Success, Welcome ${user.fullName}`, {
                    id: 'login'
                })

                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        user,
                        token
                    }
                })
            } else if (res.status === 404) {
                toast.error("Invalid Password..!")
                dispatch({
                    type: authConstants.LOGIN_ERROR
                })
            } else if (res.status === 405) {
                toast.error('No user under this email..!')
                dispatch({
                    type: authConstants.LOGIN_ERROR
                })
            }
        } catch (error) {
            toast.error("somthing went wrong.!")
            dispatch({ type: authConstants.LOGIN_ERROR })
        }
    }
}

export const Register = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: authConstants.SIGNUP_REQUEST })
            const res = await axios.post('http://localhost:5005/user/register', data)
            if (res.status === 200) {
                dispatch({
                    type: authConstants.SIGNUP_SUCCESS,
                    payload: res.data.payload
                })
                toast.success("Registration Succefull..!");
            } else if (res.status === 404) {
                dispatch({
                    type: authConstants.SIGNUP_ERROR
                })
                toast.error("Registration error..!");
            } else if (res.status === 401) {
                dispatch({
                    type: authConstants.SIGNUP_ERROR
                })
                toast.error("User already exist..!");
            }
        } catch (error) {
            toast.error("Somthing went wrong..!")
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

        toast.success("Logout successfull..!", {
            id: "logout"
        })
        dispatch({
            type: authConstants.LOGOUT_SUCCESS
        })


    }
}

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