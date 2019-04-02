import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { store } from './store/Store'
import '../style/App.scss';
import Login from './login/Login';
// import SetRouter from './router/SetRouter';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="App">
                {/* <SetRouter /> */}
                <Login />
            </div>
        </Provider>
    );
  }
}

export default App;