import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from "redux-thunk"
import bdgtReducer from '../reducers/bdgtReducer'
import catgReducer from '../reducers/catgReducer'
import tokenReducer from '../reducers/tokenReducer'
import userProfileReducer from '../reducers/userProfileReducer'
import expReducer from '../reducers/expReducer'

const configStore = () => {
    const store = createStore(combineReducers({
        token:tokenReducer,
        userProfile:userProfileReducer,
        budget:bdgtReducer,
        categories:catgReducer,
        expenses:expReducer
    }),applyMiddleware(thunk))
    return store
}

export default configStore