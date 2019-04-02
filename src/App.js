import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  handleErrorButtonClick = () => {
    throw new Error(`Attempt ${this.props.attemptNb}: Error button clicked`);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Sentry no-dom breadcrumbs bug.
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Add SENTRY_DSN and choose ATTEMPT_NB at <code>src/index.js</code> and click buttons.</p>
          <button>nice button</button>
          <button onClick={this.handleErrorButtonClick}>error button</button>
        </header>
      </div>
    );
  }
}

export default App;
