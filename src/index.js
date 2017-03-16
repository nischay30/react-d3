import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
ReactDOM.render(
  <App width={ 550 } height={ 630 }/>,
  document.getElementById('root')
);
