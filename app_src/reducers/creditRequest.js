import { SAVE_CREDIT_REQUEST } from '../actions/creditRequest'

export default function creditRequest(state = null, action) {
    switch(action.type) {
        case SAVE_CREDIT_REQUEST:
            return {
                ...action.request,
            }
        default:
            return state
    }
}