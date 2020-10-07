import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filter-sort">
          Sort by {" "}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Most Recent</option>
            <option value="lowest">Lowest Price</option>
            <option value="highest">Highest Price</option>
          </select>
        </div>
        <div className="filter-color">
          Filter {" "}
          <select value={this.props.size} onChange={this.props.filterProducts}>
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
