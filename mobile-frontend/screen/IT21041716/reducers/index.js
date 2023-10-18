import { combineReducers } from 'redux'
import authReducer from './authReducer'
import topUpReducer from './topUpReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    topUp: topUpReducer
})

export default rootReducer