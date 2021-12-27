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

const useStore = create(
  subscribeWithSelector((set) => ({
    cart: getCart(),
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
        const newCart = [];
        return { cart: newCart };
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
