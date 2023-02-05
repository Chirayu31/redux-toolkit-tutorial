const redux = require('redux')
const reduxLogger = require('redux-logger')

const applyMiddleware = redux.applyMiddleware

const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const CAKE_RESTOCK = 'CAKE_RESTOCK'
const BUY_ICECREAM = 'BUY_ICECREAM'
const ICECREAM_RESTOCK = 'ICECREAM_RESTOCK'

function buyCake() {
    return {
        type: BUY_CAKE
    }
}

function buyIcecream() {
    return {
        type: BUY_ICECREAM
    }
}

function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCK,
        payload: qty
    }
}

function restockIcecream(qty = 1) {
    return {
        type: ICECREAM_RESTOCK,
        payload: qty
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIcecream: 20
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIcecreamState = {
    numOfIcecream: 20
}

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCK:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }

        default:
            return state
    }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIcecream: state.numOfIcecream - 1
            }
        case ICECREAM_RESTOCK:
            return {
                ...state,
                numOfIcecream: state.numOfIcecream + action.payload
            }

        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State', store.getState())

const unSubscribe = store.subscribe(() => {

})

// store.dispatch(buyCake())
// store.dispatch(buyCake())
// store.dispatch(buyCake())
// store.dispatch(restockCake(3))

const actions = bindActionCreators({ buyCake, restockCake, buyIcecream, restockIcecream }, store.dispatch)
actions.buyCake()
actions.buyCake()
actions.buyCake()
actions.restockCake(3)
actions.buyIcecream()
actions.buyIcecream()
actions.buyIcecream()
actions.restockIcecream(3)
unSubscribe()