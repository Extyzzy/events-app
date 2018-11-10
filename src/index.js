import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import history from './history';
import { Router } from 'react-router';

const context = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        const removeCss = styles.map(x => x._insertCss());
        return () => { removeCss.forEach(f => f()); };
    },
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
