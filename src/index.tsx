import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Wrap the rendering in a function:
const render = () => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById("root")
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// Do this once
serviceWorker.unregister();
// serviceWorker.register();

// Render once
render();

// Webpack Hot Module Replacement API
if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    render();
  });
}