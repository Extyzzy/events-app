import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import configureStore from './store/configureStore';
import history from './history';
import { Router } from 'react-router';

const context = {
    // Initialize a new Redux store
    // http://redux.js.org/docs/basics/UsageWithReact.html
    store: configureStore(window.Store, { history }),
    storeSubscription: null,
};

ReactDOM.render(
    <Router history={history}>
     <App store={context.store} context={context} />
    </Router>,
     document.getElementById('root')
);

