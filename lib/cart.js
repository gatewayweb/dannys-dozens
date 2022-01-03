export function getCart() {
  if (typeof Storage !== 'undefined') {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } else {
    return {
      error: 'No web storage support',
    };
  }
}

export function addToCart(item) {
  const cart = getCart();
  // console.log(cart);
}
