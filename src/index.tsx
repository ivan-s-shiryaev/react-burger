import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    Provider,
} from 'react-redux';
import {
    compose,
    createStore,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';

import {
    rootReducer,
} from './services/reducers';
import App from './components/app/app';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

ReactDOM.createRoot(
    document.getElementById('root-app') as HTMLElement
).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
