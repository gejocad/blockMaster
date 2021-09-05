import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { movieReducer } from "../reducers/movieReducer";
import { registro } from "../reducers/uiReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducer = combineReducers({
    auth: authReducer,
    ui: registro,
    movie: movieReducer
})

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
)