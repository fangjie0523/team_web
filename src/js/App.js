import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { store } from './store/Store'
import '../style/App.scss';
import './utils/emptyUtils'
import SetRouter from './router/SetRouter';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
                <SetRouter />
            </div>
        </Provider>
    );
  }
}

export default App;
