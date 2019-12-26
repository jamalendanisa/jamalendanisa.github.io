import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import AOS from 'aos';
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import * as serviceWorker from "./serviceWorker";
import App from "./components/app/App";

import "./index.css";
import "aos/dist/aos.css";

AOS.init({
  disable: false,
  once: true,
  mirror: false
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
      <App/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
