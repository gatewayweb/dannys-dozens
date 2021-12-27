import { useState } from 'react';
import Link from 'next/link';

import Header from '@/components/header';

import { getOrderPage } from '@/lib/api';
import useStore from '@/lib/store';
import { useEffect } from 'react/cjs/react.development';

export default function Order({ page }) {
  const [orderData, setOrderData] = useState(null);

  const cart = useStore((state) => state.cart) || [];
  const emptyCart = useStore((state) => state.emptyCart);
  const updateQuantity = useStore((state) => state.updateCartItemQuantity);
  const removeItem = useStore((state) => state.removeFromCart);

  useEffect(() => {
    setOrderData(cart);
  }, [cart]);

  const CartButtons = () => {
    return <></>;
  };

  return (
    <>
      <Header title="Dannys Dozens | Order Online" />
      <main className="px-6 py-12 flex-grow">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-white p-4 md:p-8 max-w-full mx-auto">
          <h1 className="relative font-light text-center text-gray-500 mb-4 uppercase text-5xl">{page.title}</h1>
          {orderData && orderData.length ? (
            <>
              <div></div>
              <div className="text-gray-700 mt-8">
                {orderData.map((cartItem, index) => {
                  if (!cartItem?.item || !cartItem?.size || !cartItem?.quantity) return <></>;
                  const { item, size, quantity } = cartItem;
                  return (
                    <div
                      key={index}
                      className="bg-white border rounded-lg mb-5 px-6 py-4 flex flex-col md:flex-row items-center justify-between duration-200 hover:border-white hover:shadow-lg"
                    >
                      <h3 className="font-bold leading-tight text-center md:text-xl md:text-left">
                        {item.name}
                        <div className="mt-1 md:mt-0">
                          <div
                            className={`text-sm font tracking-widest uppercase text-white ${
                              size === 'Half Dozen' ? 'bg-blue-600' : 'bg-green-600'
                            } px-4 py-1 rounded-full inline-block`}
                          >
                            {size}
                          </div>
                        </div>
                      </h3>
                      <div className="flex flex-col w-full justify-center items-center sm:flex-row sm:justify-between md:w-auto">
                        <div className="flex mt-3 md:mt-0">
                          <button
                            onClick={() => {
                              const newQuantity = parseInt(quantity) - 1;
                              if (newQuantity <= 0) {
                                removeItem(index);
                              } else {
                                updateQuantity(item, size, newQuantity);
                              }
                            }}
                            className="rounded-full px-2 border border-gray-300 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="font-bold text-xl px-3">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item, size, parseInt(quantity) + 1)}
                            className="rounded-full px-2 border border-gray-300 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="rounded-full px-4 sm:ml-6 border border-gray-300 text-xs uppercase text-gray-400 mt-5 sm:mt-3 md:mt-0 hover:bg-gray-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center flex-wrap">
                <button
                  className="bg-gray-200 mx-2 mt-2 px-4 py-2 text-lg rounded-lg border-b-2 border-gray-300 font-bold text-gray-800 hover:bg-gray-300"
                  onClick={emptyCart}
                >
                  Start Over
                </button>
                <Link href="/menu">
                  <a className="bg-yellow-400 mx-2 mt-2 px-4 py-2 text-lg rounded-lg border-b-2 border-yellow-500 font-bold text-gray-800 hover:bg-yellow-500">
                    Add More Cookies
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-2xl text-gray-600 pt-8 pb-12">
                  You haven't added any cookies to your order yet!
                </div>

                <Link href="/menu" passHref>
                  <a className="bg-yellow-400 text-yellow-900 text-2xl rounded-full px-8 py-1 border-b border-yellow-700 duration-150 hover:bg-yellow-500">
                    Add Cookies
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const data = (await getOrderPage()) || {};

  return {
    props: data,
  };
}
