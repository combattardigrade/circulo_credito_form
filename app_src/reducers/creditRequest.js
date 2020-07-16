import { SAVE_CREDIT_REQUEST, SAVE_CREDIT_REQUEST_ID, SAVE_CREDIT_REQUEST_NIP } from '../actions/creditRequest'

export default function creditRequest(state = null, action) {
    switch(action.type) {
        case SAVE_CREDIT_REQUEST:
            return {
                ...action.request,
            }
        case SAVE_CREDIT_REQUEST_ID:
            return {
                ...state,
                creditRequestId: action.creditRequestId
            }
        case SAVE_CREDIT_REQUEST_NIP:
            return {
                ...state,
                creditRequestNIP: action.creditRequestNIP
            }
        default:
            return state
    }
}