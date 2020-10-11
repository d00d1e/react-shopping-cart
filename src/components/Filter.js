import React, { Component } from 'react';
import { connect } from "react-redux"
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading filter...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">{this.props.filteredProducts.length} Products</div>
        <div className="filter-sort">
          Sort by {" "}
          <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="lowest">Lowest Price</option>
            <option value="highest">Highest Price</option>
          </select>
        </div>
        <div className="filter-color">
          Filter {" "}
          <select value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
            <option value="*">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({
  size: state.products.size,
  sort: state.products.sort,
  products: state.products.items,
  filteredProducts: state.products.filteredItems,
}),
{ filterProducts, sortProducts }
)(Filter);