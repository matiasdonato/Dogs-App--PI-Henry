import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducer/reducer";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: "persist-root",
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk))
);

const persistor = persistStore(store)
export { persistor };
export default store;