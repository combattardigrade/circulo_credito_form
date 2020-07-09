export const SAVE_CREDIT_REQUEST = 'SAVE_CREDIT_REQUEST'

export function saveCreditRequest(request) {
    return {
        type: SAVE_CREDIT_REQUEST,
        request,
    }
}