import React, { Component } from 'react';
import formatCurrency from "../util";
import { Fade, Zoom } from 'react-awesome-reveal';
import Modal from 'react-modal'; //need to have state to open/hide modal

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state ={
      product: null
    }
  }

  openModal = (product) => {
    this.setState({ product });
  }

  closeModal = () => {
    this.setState({ product: null })
  }

  render() {
    const { product } = this.state;

    return (
      <div>
        <Fade direction="bottom" cascade damping={0.15} triggerOnce>
          <ul className="products">
            {this.props.products.map((product) => (
              <li key={product._id}>
                <div className="product">
                  <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                    <img src={product.image} alt={product.title}/>
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button className="button primary" onClick={() => this.props.addToCart(product)}>Add To Cart</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>

        {product && (
          <Modal 
            isOpen={true}
            onRequestClose={this.closeModal} 
            ariaHideApp={false} // Modal.setAppElement(el)` or set `appElement={el}`
          >
            <Zoom triggerOnce>
              <button className="close-modal" onClick={this.closeModal}>x</button>
              <div className="product-details">
                <img src={product.image} alt={product.title}/>
                <div className="product-details-description">
                  <p><strong>{product.title}</strong></p>
                  <p>{product.description}</p>
                  <p>
                    Available Sizes {" "}
                    {product.availableSizes.map((x, index) => (
                      <span key={index}> 
                        {" "} 
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>
                      {formatCurrency(product.price)}
                      <button 
                        className="button primary" 
                        onClick={() => {
                          this.props.addToCart(product);
                          this.closeModal();
                        }}
                      >Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
