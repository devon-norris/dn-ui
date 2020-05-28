import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import sortObject from '../utils/sortObject'

// Import Reducers
import auth from './auth'
import viewState from './viewState'
import organizations from './organizations'
import users from './users'
import permissions from './permissions'

const rootReducer = combineReducers(sortObject({ auth, viewState, organizations, users, permissions }))
const middleWare = applyMiddleware(thunk)

export default () => createStore(rootReducer, composeWithDevTools(middleWare))
