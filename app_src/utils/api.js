const API = 'http://localhost/swaydo/api/'

export function createCreditRequest(params) {
    return fetch(API + 'create_credit_request', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}