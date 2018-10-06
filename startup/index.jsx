import 'babel-polyfill';
import { connector } from 'connector';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Store, reducers, sagas, actions } from 'domain';
// import webApi from 'services';
import { logger, LogLevel, ErrorBoundary, localStorage, sessionStorage, currentCulture } from 'core';
import 'core/exceptions/globalExceptionHandler';

import { App } from '../modules/app/components/App/App';
import '../styles/sass/import.scss';

// To comunicate with chrome dev tools
const redux_dev_extension = window['__REDUX_DEVTOOLS_EXTENSION__'] &&
    window['__REDUX_DEVTOOLS_EXTENSION__']();
const sagaMiddleware = createSagaMiddleware();
const allMiddlewares = [applyMiddleware(sagaMiddleware), redux_dev_extension]
    .filter(m => m !== undefined);
const middlewares = compose(...allMiddlewares);

const store = createStore(combineReducers(reducers), middlewares);

store.subscribe(() => {
    const { culture } = store.getState();
    currentCulture.use(culture);
});

sagas.forEach(saga => sagaMiddleware.run(saga));
actions.store = () => new Store(store);
connector.use(store, actions);

const errorLogHandler = {
    logLevels: [LogLevel.error],
    manageLog(/* log */) {
        // webApi.Traces_LogError(log);
    }
};
logger.addLogsHandler(errorLogHandler);
const app = (
    <HashRouter>
        <ErrorBoundary logErrorInWebApi={log => logger.error(log)}>
            <App className="App0" />
        </ErrorBoundary>
    </HashRouter>
);
ReactDOM.render(app, window.document.getElementById('app'));

// Use core session and local storage helpers
sessionStorage.set('app', 'running');
localStorage.set('app', 'running');
