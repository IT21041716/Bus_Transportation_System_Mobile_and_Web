import { topUpConstants } from '../actions/constants'

const initState = {
    loading: false,
    topUps: [],
    trips: [],
    smartCard: {},
    balance: 0
}

export default (state = initState, action) => {
    switch (action.type) {
        case topUpConstants.NEW_TOPUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case topUpConstants.NEW_TOPUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                smartCard: action.payload,
                balance:action.payload.balance
            }
            break;
        case topUpConstants.NEW_TOPUP_ERROR:
            state = {
                ...state,
                loading: false
            }
            break;
        case topUpConstants.CHK_BALANCE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case topUpConstants.CHK_BALANCE_SUCCESS:
            state = {
                ...state,
                loading: false,
                balance: action.payload
            }
            break;
        case topUpConstants.CHK_BALANCE_ERROR:
            state = {
                ...state,
                loading: false
            }
            break;
        case topUpConstants.DEDUCT_BALANCE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case topUpConstants.DEDUCT_BALANCE_SUCCESS:
            state = {
                ...state,
                loading: false,
                balance: action.payload.balance
            }
            break;
        case topUpConstants.DEDUCT_BALANCE_ERROR:
            state = {
                ...state,
                loading: false
            }
            break;
        case topUpConstants.CLAIM_UPDATE_BALANCE_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case topUpConstants.CLAIM_UPDATE_BALANCE_SUCCESS:
            state = {
                ...state,
                loading: false,
                balance:action.payload.balance
            }
            break;
        case topUpConstants.CLAIM_UPDATE_BALANCE_ERROR:
            state = {
                ...state,
                loading: false
            }
            break;
        case topUpConstants.GET_ALL_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case topUpConstants.GET_ALL_SUCCESS:
            state = {
                ...state,
                loading: false,
                topUps: action.payload
            }
            break;
        case topUpConstants.GET_ALL_ERROR:
            state = {
                ...state,
                loading: false
            }
            break;
        case topUpConstants.ALL_TRIPS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case topUpConstants.ALL_TRIPS_SUCCESS:
            state = {
                ...state,
                loading: false,
                trips: action.payload
            }
            break;
        case topUpConstants.ALL_TRIPS_ERROR:
            state = {
                ...state,
                loading: false
            }
            break;
    }
    return state;
}