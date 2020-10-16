import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AdminScreen from './screens/AdminScreen';
import HomeScreen from './screens/HomeScreen';
import store from "./store";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <Link to="/">L' MAU</Link>
              <Link to="/admin" className="admin">Admin</Link>
            </header>
            <main>
              <Route path='/admin' component={AdminScreen} />
              <Route exact path='/' component={HomeScreen} />
            </main>
            <footer>&#169;2020 L' Mau Inc.</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
