import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import allReducer from '../reducers';
import thunk from "redux-thunk";

const store = createStore(allReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;