const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUsersFail = (err) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: err
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUESTED:
            return { ...state, loading: true }
        case FETCH_USERS_SUCCEEDED:
            return { loading: false, users: action.payload, error: '' }
        case FETCH_USERS_FAILED:
            return { loading: false, users: [], error: '' }
        default: return state
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())

        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                const users = res.data.map(user => user.id)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(err => {
                dispatch(fetchUsersFail(err.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))


store.subscribe(() => { console.log(store.getState()) })

store.dispatch(fetchUsers())