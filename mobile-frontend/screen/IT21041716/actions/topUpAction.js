import { topUpConstants } from "./constants";


export const NewTopUp = (data) => {
    return async (dispatch) => {

        try {
            dispatch({ type: topUpConstants.NEW_TOPUP_REQUEST })
            const response = await fetch("http://localhost:5005/topup/insert", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();


            if (res.status === 201) {
                dispatch({
                    type: topUpConstants.NEW_TOPUP_SUCCESS,
                    payload: res.data.payload
                })
                ToastAndroid.show("Smart Cart balance top up successfull..!", ToastAndroid.SHORT);
            } else if (res.status === 404) {
                dispatch({ type: topUpConstants.NEW_TOPUP_ERROR })

            } else if (res.status === 403) {
                dispatch({ type: topUpConstants.NEW_TOPUP_ERROR })

            } else if (res.status === 500) {
                dispatch({ type: topUpConstants.NEW_TOPUP_ERROR })

            }
        } catch (error) {
            dispatch({ type: topUpConstants.NEW_TOPUP_ERROR })

        }

    }
}

//working
export const checkBalance = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: topUpConstants.CHK_BALANCE_REQUEST })
            const response = await fetch("http://localhost:5005/topup/check", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
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
            const response = await fetch("http://localhost:5005/topup/get", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
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
            const response = await fetch("http://localhost:5005/topup/deduct", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
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
            const response = await fetch("http://localhost:5005/topup/claimUpdate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
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


export const Alltrips = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: topUpConstants.ALL_TRIPS_REQUEST })
            const response = await fetch("http://localhost:5005/topup/trips", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            if (res.status === 200) {
                dispatch({
                    type: topUpConstants.ALL_TRIPS_SUCCESS,
                    payload: res.data.payload
                })
            } else if (res.status === 404) {
                dispatch({ type: topUpConstants.ALL_TRIPS_ERROR })
            }
        } catch (error) {
            dispatch({ type: topUpConstants.ALL_TRIPS_ERROR })
        }
    }
}