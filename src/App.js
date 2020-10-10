import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import store from "./store";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [], 
    }
  }
  
  addToCart = (product) => { 
    const cartItems = this.state.cartItems.slice(); // instance of cart items 
    let alreadyInCart = false;

    cartItems.forEach(item => {
      if (item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    // add instance of item as new item
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({
      cartItems
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice(); 
    // removes current selected product
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id)
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(x => x._id !== product._id)));
  }

  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">MAU</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart 
                  cartItems={this.state.cartItems} 
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>&#169;2020 Mau Inc.</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
