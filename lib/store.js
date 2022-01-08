import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const getCart = () => {
  if (typeof Storage !== 'undefined') {
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    return data || [];
  } else {
    return [];
  }
};

const findCartItem = (cart, checkItem) => {
  const { item, size } = checkItem;
  if (cart && cart.length) {
    const match = cart.findIndex((cartItem) => {
      return cartItem.item.id === item.id && cartItem.size === size;
    });
    return match;
  }
  return -1;
};

const getOrderTotal = (cart) => {
  let newOrderTotal = 0;

  if (cart && cart.length) {
    cart.forEach((cartItem) => {
      const { item, size, quantity } = cartItem;

      let pricePerItem = 0;
      const itemQuantity = parseInt(quantity);

      if (size === 'Dozen') {
        pricePerItem = parseInt(item.pricing.pricePerDozen);
      } else {
        pricePerItem = parseInt(item.pricing.pricePerHalfDozen);
      }

      newOrderTotal += pricePerItem * itemQuantity;
    });
  }

  return newOrderTotal;
};

const useStore = create(
  subscribeWithSelector((set) => ({
    cart: getCart(),
    orderTotal: 0,
    addToCart: (item, size) => {
      set((state) => {
        var newCart;
        var newCartItem = { item, size, quantity: 1 };
        const inCart = findCartItem(state.cart, newCartItem);
        if (inCart !== -1) {
          newCart = state.cart.map((cartItem, index) => {
            if (index === inCart) {
              return {
                ...cartItem,
                quantity: parseInt(cartItem.quantity) + 1,
              };
            }

            return cartItem;
          });
        } else {
          newCart = [newCartItem, ...state.cart];
        }

        return { cart: newCart };
      });
    },
    updateCartItemQuantity(item, size, quantity) {
      set((state) => {
        let newCart = [...state.cart];
        const newCartItem = { item, size, quantity };
        const inCart = findCartItem(state.cart, newCartItem);
        if (inCart !== -1) {
          newCart = state.cart.map((cartItem, index) => {
            if (index === inCart) {
              return {
                ...cartItem,
                quantity,
              };
            }

            return cartItem;
          });
        }

        return { cart: newCart };
      });
    },
    removeFromCart: (index) => {
      set((state) => ({
        cart: state.cart.filter((cartItem, cartItemIndex) => index !== cartItemIndex),
      }));
    },
    emptyCart: () => {
      set(() => {
        return { cart: [] };
      });
    },
    setOrderTotal: () => {
      set((state) => {
        let newOrderTotal = 0;

        if (state.cart && state.cart.length) {
          state.cart.forEach((cartItem) => {
            const { item, size, quantity } = cartItem;

            let pricePerItem = 0;
            const itemQuantity = parseInt(quantity);

            if (size === 'Dozen') {
              pricePerItem = parseInt(item.pricing.pricePerDozen);
            } else if (size === 'Half Dozen') {
              pricePerItem = parseInt(item.pricing.pricePerHalfDozen);
            } else if (size === 'Single') {
              pricePerItem = parseInt(item.pricing.pricePerSingle);
            }

            newOrderTotal += pricePerItem * itemQuantity;
          });
        }

        return { orderTotal: newOrderTotal };
      });
    },
  })),
);

export const updateLocalStorage = (cart) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export default useStore;
