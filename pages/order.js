import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Header from '@/components/header';

import { getOrderPage } from '@/lib/api';
import useStore from '@/lib/store';
import Modal from '@/lib/modal';

const inputStyles = 'block h-[50px] border border-gray-300 px-2 w-full rounded';
const labelStyles = 'text-gray-700 uppercase text-sm tracking-wide';

export default function Order({ page }) {
  const router = useRouter();

  const [orderData, setOrderData] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [customer, setCustomer] = useState({
    email: '',
    name: '',
    phone: '',
  });

  const cart = useStore((state) => state.cart) || [];
  const emptyCart = useStore((state) => state.emptyCart);
  const updateQuantity = useStore((state) => state.updateCartItemQuantity);
  const removeItem = useStore((state) => state.removeFromCart);

  const onChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setOrderData(cart);
  }, [cart]);

  const submitOrder = async () => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cart, customer }),
      });
      toast.success('Your order has been placed!');
      setIsOpen(false);
      emptyCart();
    } catch (error) {
      console.log(error);
      toast.error('There was an error, please email us directly at dannysdozens@gmail.com');
    }
  };

  return (
    <>
      <Header title="Dannys Dozens | Order Online" />
      <main className="px-6 py-12 flex-grow">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-white p-4 md:p-8 max-w-full mx-auto">
          <h1 className="relative font-light text-center text-gray-500 mb-4 uppercase text-5xl">{page.title}</h1>
          {orderData && orderData.length ? (
            <>
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
                            className={`text-sm font tracking-widest uppercase text-white border-b-2 ${
                              size === 'Half Dozen' ? 'bg-blue-600 border-blue-900' : 'bg-green-600 border-green-800'
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
                          className="rounded-full px-4 py-1 sm:ml-6 border border-gray-300 text-sm uppercase text-gray-500 mt-5 sm:mt-3 md:mt-0 hover:bg-gray-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center flex-wrap">
                <Link href="/menu">
                  <a className="bg-yellow-400 mx-2 mt-2 px-6 py-2 text-lg rounded-lg border-b-2 border-yellow-500 font-bold text-gray-800 hover:bg-yellow-500">
                    Add More Cookies
                  </a>
                </Link>
                <button
                  className="bg-green-600 mx-2 mt-2 px-6 py-2 text-lg rounded-lg border-b-2 border-green-700 font-bold text-white hover:bg-green-700"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  Order Now
                </button>
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
      <Modal isOpen={modalIsOpen} setIsOpen={setIsOpen} contentLabel="Add To Cart">
        <div>
          <h3 className="font-light uppercase text-center text-gray-800 text-4xl tracking-tight">Place Order</h3>
          <div className="text-center md:px-20 py-2">
            After placing your order, we will reach out to you for payment and to confirm a few details.
          </div>
          <div className="py-2">
            <label for="name" className={labelStyles}>
              Your Name
            </label>
            <input
              name="name"
              id="name"
              value={customer.name}
              type="text"
              className={inputStyles}
              onChange={onChange}
            />
          </div>
          <div className="py-2">
            <label for="email" className={labelStyles}>
              Your Email
            </label>
            <input
              name="email"
              id="email"
              value={customer.email}
              type="text"
              className={inputStyles}
              onChange={onChange}
            />
          </div>
          <div className="py-2">
            <label for="phone" className={labelStyles}>
              Your Phone
            </label>
            <input
              name="phone"
              id="phone"
              value={customer.phone}
              type="tel"
              className={inputStyles}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-wrap justify-center">
            <button
              className="bg-gray-200 mx-2 mt-2 px-4 py-2 text-lg rounded-lg border-b-2 border-gray-300 font-bold text-gray-800 hover:bg-gray-300"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              onClick={submitOrder}
              className="bg-yellow-400 mx-2 mt-2 px-6 py-2 text-lg rounded-lg border-b-2 border-yellow-500 font-bold text-gray-800 hover:bg-yellow-500"
            >
              Submit Order
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer position="bottom-right" autoClose={10000} theme="colored" />
    </>
  );
}

export async function getStaticProps() {
  const data = (await getOrderPage()) || {};

  return {
    props: data,
  };
}
