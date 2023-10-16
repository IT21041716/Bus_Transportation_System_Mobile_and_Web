import { topUpConstants } from "./constants";
import { toast } from 'react-hot-toast'
import axios from 'axios'

export const NewTopUp = (data) => {
    return async (dispatch) => {

        try {
            dispatch({ type: topUpConstants.NEW_TOPUP_REQUEST })
            const res = await axios.post("http://localhost:5005/topup/insert", data)
            if (res.status === 201) {
                dispatch({
                    type: topUpConstants.NEW_TOPUP_SUCCESS,
                    payload: res.data.payload
                })
                toast.success("Smart Cart balance top up successfull..!")
            } else if (res.status === 404) {
                dispatch({ type: topUpConstants.NEW_TOPUP_ERROR })
                toast.error("Topup failed..!")
            } else if (res.status === 403) {
                dispatch({ type: topUpConstants.NEW_TOPUP_ERROR })
                toast.error("Cannot find smartCard..!")
            } else if (res.status === 500) {
                dispatch({ type: topUpConstants.NEW_TOPUP_ERROR })
                toast.error("Somthing went wrong..!")
            }
        } catch (error) {
            dispatch({ type: topUpConstants.NEW_TOPUP_ERROR })
            toast.error("Somthing went wrong..!")
        }

    }
}

//working
export const checkBalance = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: topUpConstants.CHK_BALANCE_REQUEST })
            const res = await axios.post("http://localhost:5005/topup/check", data)
            if (res.status === 200 || res.status === 201) {
                dispatch({
                    type: topUpConstants.CHK_BALANCE_SUCCESS,
                    payload: res.data.payload
                })
            } else if (res.status === 404) {
                dispatch({ type: topUpConstants.CHK_BALANCE_ERROR })
            }
        } catch (error) {
            dispatch({ type: topUpConstants.CHK_BALANCE_ERROR })
        }
    }
}
//working
export const getAllByUser = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: topUpConstants.GET_ALL_REQUEST })
            const res = await axios.post("http://localhost:5005/topup/get", data)
            if (res.status === 200) {
                dispatch({
                    type: topUpConstants.GET_ALL_SUCCESS,
                    payload: res.data.payload
                })
            } else if (res.status === 404) {
                dispatch({ type: topUpConstants.GET_ALL_ERROR })
            }
        } catch (error) {
            dispatch({ type: topUpConstants.GET_ALL_ERROR })
        }
    }
}

export const reduceBalance = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: topUpConstants.DEDUCT_BALANCE_REQUEST })
            const res = await axios.post("http://localhost:5005/topup/deduct", data)

            if (res.status === 201) {
                dispatch({
                    type: topUpConstants.DEDUCT_BALANCE_SUCCESS,
                    payload: res.data.payload
                })
            } else if (res.status === 404) {
                dispatch({ type: topUpConstants.DEDUCT_BALANCE_ERROR })
            } else if (res.status === 403) {
                dispatch({ type: topUpConstants.DEDUCT_BALANCE_ERROR })
            }
        } catch (error) {
            dispatch({ type: topUpConstants.DEDUCT_BALANCE_ERROR })
        }
    }
}

export const claimUpdateBalance = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: topUpConstants.CLAIM_UPDATE_BALANCE_REQUEST })
            const res = await axios.post("http://localhost:5005/topup/claimUpdate", data)

            if (res.status === 201) {
                dispatch({
                    type: topUpConstants.CLAIM_UPDATE_BALANCE_REQUEST,
                    payload: res.data.payload
                })
            } else if (res.status === 404) {
                dispatch({ type: topUpConstants.CLAIM_UPDATE_BALANCE_ERROR })
            } else if (res.status === 403) {
                dispatch({ type: topUpConstants.CLAIM_UPDATE_BALANCE_ERROR })
            }
        } catch (error) {
            dispatch({ type: topUpConstants.CLAIM_UPDATE_BALANCE_ERROR })
        }
    }
}
