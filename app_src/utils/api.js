const API = process.env.HOST + 'api/'
// const API = 'http://genesisblock.ddns.net/swaydo/api/'
// const API = 'http://localhost/swaydo/api/'

export function createCreditRequest(params) {
    return fetch(API + 'create_credit_request', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

export function checkCreditRequestNIP(params) {
    return fetch(API + 'check_nip', {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}