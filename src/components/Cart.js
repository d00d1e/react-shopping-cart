import React, { Component } from "react";
import formatCurrency from "../util";
import { Slide } from "react-awesome-reveal";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false,
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  }

  render() {
    const {cartItems} = this.props;

    return (
      <div>
        {cartItems.length === 0? (
          <div className="cart cart-header">Cart is empty</div>
        ):(
          <div className="cart cart-header">You have {cartItems.length} item(s) in your cart{" "}</div>
        )}
        
        <div>
          <div className="cart">
            <Slide direction="left" cascade damping={0.15} triggerOnce>
              <ul className="cart-items">
                {cartItems.map(item => (
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count} {" "}
                        <button className="button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Slide>
          </div>

          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total: {" "} {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
                  </div>
                  <button className="button primary" onClick={() => {this.setState({ showCheckout: true })}}>Checkout</button>
                </div>
              </div>

              {this.state.showCheckout && (
               
                <Slide direction="right" triggerOnce>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <label>Email</label>
                          <input type="email" name="email" onChange={this.handleInput} required/>
                        </li>
                        <li>
                          <label>Name</label>
                          <input type="text" name="name" onChange={this.handleInput} required/>
                        </li>
                        <li>
                          <label>Address</label>
                          <input type="text" name="address" onChange={this.handleInput} required/>
                        </li>
                        <li>
                          <button type="submit" className="button primary">Place order</button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Slide>
  
              )}
            </div>
          )}
        </div>
      </div> 
    );
  }
}