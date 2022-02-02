import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.min.css';

import { getOrderPage } from '@/lib/api';
import useStore from '@/lib/store';
import Header from '@/components/header';
import OrderModal from '@/components/order-modal';
import OrderItem from '@/components/order-item';
import Button from '@/components/button';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatPrice = (price) => {
  return price % 1 !== 0 ? formatter.format(price) : `$${price}`;
};

export default function Order({ page }) {
  const [orderData, setOrderData] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [customer, setCustomer] = useState({
    email: '',
    name: '',
    phone: '',
  });

  const cart = useStore((state) => state.cart) || [];
  const orderTotal = useStore((state) => state.orderTotal);
  const setOrderTotal = useStore((state) => state.setOrderTotal);

  useEffect(() => {
    setOrderData(cart);
    setOrderTotal(cart);

    if (cart && cart.length) {
      let newQuantity = 0;
      cart.forEach((item) => {
        let cookieQuantity = 1;
        switch (item.size) {
          case 'Dozen':
            cookieQuantity = 12;
            break;
          case 'Half Dozen':
            cookieQuantity = 6;
        }
        newQuantity += parseInt(item.quantity) * cookieQuantity;
      });
      setCartQuantity(newQuantity);
    } else {
      setCartQuantity(0);
    }
  }, [cart]);

  return (
    <>
      <Header title="Dannys Dozens | Order Online" />
      <main className="px-6 py-12 flex-grow">
        {!orderSuccess ? (
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-white p-4 md:p-8 max-w-full mx-auto">
            <h1 className="relative font-light text-center text-gray-500 mb-4 uppercase text-5xl">{page.title}</h1>
            {orderData && orderData.length ? (
              <>
                <div className="text-gray-700 mt-8">
                  {orderData.map((cartItem, index) => {
                    if (!cartItem?.item || !cartItem?.size || !cartItem?.quantity) return <></>;
                    return <OrderItem key={index} index={index} cartItem={cartItem} />;
                  })}
                </div>

                {orderTotal && orderTotal > 0 ? (
                  <div className="bg-white border border-b-4 border-gray-200 rounded-lg mb-5 px-6 py-4 flex flex-col md:flex-row items-center justify-between text-gray-700">
                    <h3 className="font-bold leading-tight text-center md:text-xl md:text-left">
                      Order Total ({cartQuantity} Cookies)
                    </h3>
                    <span className="text-2xl">{formatPrice(orderTotal)}</span>
                  </div>
                ) : (
                  <></>
                )}

                {cartQuantity < 6 ? (
                  <div className="text-center py-3">
                    To place an order, you must add at least 6 cookies to your order. Thanks!
                  </div>
                ) : (
                  ''
                )}
                <div className="flex justify-center flex-wrap">
                  <Link href="/menu">
                    <a className="bg-yellow-400 mx-2 mt-4 px-6 py-2 text-2xl rounded-lg border-b-2 border-yellow-500 font-bold text-gray-800 hover:bg-yellow-500">
                      Add More Cookies
                    </a>
                  </Link>
                  <button
                    className="bg-green-600 mx-2 mt-4 px-6 py-2 text-2xl rounded-lg border-b-2 border-green-700 font-bold text-white hover:bg-green-700 disabled:bg-gray-300 disabled:border-none"
                    disabled={cartQuantity < 6}
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
                  <Button link="/menu" className="text-2xl">
                    Add Cookies
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden px-4 md:px-8 max-w-full mx-auto py-20 flex justify-center items-center flex-col">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100 to-white opacity-40"></div>
            <h1 className="relative font-bold text-center text-green-600 mb-4 uppercase text-5xl">Thank You!</h1>
            <div className="relative text-2xl mt-2 mb-8 md:w-[500px] max-w-full mx-auto text-center text-gray-600">
              We got your order and will be in touch soon, keep an eye out for an email or call from us. Feel free to
              text my phone (508) 942-4976 for payment instructions.
            </div>
            {/* <div className="relative w-full md:w-3/5 xl:w-2/5 mx-auto bg-white p-12 rounded-lg overflow-hidden drop-shadow-2xl mb-12">
              <Link href="https://venmo.com/u/DannysDozens" passHref>
                <a>
                  <Image src="/venmo.png" width={978} height={1375} layout="responsive" />
                </a>
              </Link>
            </div> */}
            <Button color="gray" link="/" className="relative">
              Home
            </Button>
          </div>
        )}
      </main>
      <OrderModal
        isOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        customer={customer}
        setCustomer={setCustomer}
        setOrderSuccess={setOrderSuccess}
      />
    </>
  );
}

export async function getStaticProps() {
  const data = (await getOrderPage()) || {};

  return {
    props: data,
  };
}
