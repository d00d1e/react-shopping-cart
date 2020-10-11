import React, { Component } from "react";
import formatCurrency from "../util";
import Modal from 'react-awesome-modal';
import { Slide, Zoom } from "react-awesome-reveal";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";
 
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
      visible: false,
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
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  }

  closeModal = () => {
    this.setState({ visible: false })
    this.props.clearOrder();

    // temp fix for CLEAR_CART ?? 
    window.location.reload(false);
  };

  render() {
    const { cartItems, order } = this.props;

    return (
      <div>
        {cartItems.length === 0? (
          <div className="cart cart-header">Cart is empty</div>
        ):(
          <div className="cart cart-header">You have {cartItems.length} item(s) in your cart{" "}</div>
        )}
        
        {order && 
          <Modal
            visible={true}
            width="1100"
            effect="fadeInUp"
            onClickAway={this.closeModal}
          >
            <Zoom>
              <div className="order-details">
                <button className="close-modal" onClick={this.closeModal}>x</button>
                <h3 className="success-message">Thank You! Your order has been placed.</h3>
                <h2>Order #{order._id}</h2>
                <ul>
                  <li>
                    <div>Date: </div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Name: </div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email: </div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address: </div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Total: </div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items: </div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div key={x._id}> 
                          {x.count} {" x "} {x.title} 
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        }
        <div>
          <div className="cart">
            <Slide direction="left" cascade damping={0.15} triggerOnce>
              <ul className="cart-items">
                {cartItems.map((item) => (
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

export default connect((state) => ({
  cartItems: state.cart.cartItems,
  order: state.order.order,
}),
{ removeFromCart, createOrder, clearOrder }
)(Cart);