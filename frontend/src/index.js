import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore , applyMiddleware, compose , combineReducers} from 'redux';
import 'semantic-ui-css/semantic.min.css';
import auth from './store/reducers/auth'
import event from './store/reducers/event'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  //For Redux Dev Tools Setup


const rootReducer = combineReducers({
    auth : auth,
    event: event
});

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));



serviceWorker.register();
