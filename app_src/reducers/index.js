import { combineReducers } from 'redux'
import creditRequest from './creditRequest'
import formController from './formController'
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({    
    creditRequest,
    formController,
})

const rootReducer = (state, action) => {    
    if(action.type == 'USER_LOGOUT') {
        storage.removeItem('persist:root')
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer