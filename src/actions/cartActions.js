import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExist = false;

  cartItems.forEach(x => {
    if (x._id === product._id){
      alreadyExist = true;
      x.count++;
    }
  });
  if (!alreadyExist) {
    // add instance of item as new item
    cartItems.push({...product, count: 1});
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  // update localstorage based on new cart items
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
    // removes current selected product
  const cartItems = getState().cart.cartItems.slice().filter((x) => x._id !== product._id);

  dispatch({ 
    type: REMOVE_FROM_CART, 
    payload: { cartItems } 
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};