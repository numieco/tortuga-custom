import React from 'react';
import {Helmet} from "react-helmet";
import './styles/index.sass';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>Testing <span className="redBg">Numie</span> Frame work.</p>
        <p>Enjoy!</p>
      </div>

  }
}
