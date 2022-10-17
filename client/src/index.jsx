import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx"
import './index.css';
import store, { persistor } from './redux/store/store.js';
import { PersistGate } from "redux-persist/lib/integration/react";

ReactDOM.render( 
    <Provider store = {store}>
        <PersistGate persistor = {persistor}>
            <Router>
                <App></App>
            </Router> 
        </PersistGate> 
    </Provider>,
    document.getElementById('app')
);