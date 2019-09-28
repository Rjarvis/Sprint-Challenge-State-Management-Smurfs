import { combineReducers } from 'redux';
import {
    GET_SMURFS, ADD_SMURF,
    INVALIDATE_SMURF, REQUEST_SMURF,
    GOT_SMURFS
} from '../actions'

//THIS MAY NOT BE NEEDED
const reqeuestSmurf = ( state = 'reactjs', action) => {
    switch(action.type){
        case REQUEST_SMURF:
            return action.smurf
        default:
            return state
    }
}


//WHERE THE ACTIONS HAPPEN
const smurfs = (state = {
    isFetching: false,
    isAdding: false,
    didInvalidate: false,
    items: []
}, action) => {
    switch (action.type) {
        case INVALIDATE_SMURF:
            return{
                ...state,
                didInvalidate: true
            }
        case ADD_SMURF:
            return{
                ...state,
                isFetching: false,
                didInvalidate: false,
                isAdding: true,
                items: action
            }
        case GET_SMURFS:
            return{
                ...state,
                isFetching: true,
                didInvalidate: false,
                isAdding: false
            }
        case GOT_SMURFS:
            return{
                ...state,
                isFetching: false,
                didInvalidate: false,
                isAdding: false,
                items: action.smurfs.push(),
                lastUpdated: action.receivedAt

            }
        default:
            return state
    }
}

const showTheSmurfs = (state = { }, action) => {
    switch (action.type){
        case INVALIDATE_SMURF:
        case ADD_SMURF:
        case GET_SMURFS:
        case GOT_SMURFS:
            return {
                ...state,
                [action.smurf]: items(state[action.smurf], action)
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    showTheSmurfs,
    reqeuestSmurf
})

export default rootReducer