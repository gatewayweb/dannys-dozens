import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Modal from '@/lib/modal';
import Button from '@/components/button';
import useStore from '@/lib/store';

const inputStyles = 'block h-[50px] border border-gray-300 px-2 w-full rounded';
const labelStyles = 'text-gray-700 uppercase text-sm tracking-wide';

export default function OrderModal({ isOpen, setIsOpen, customer, setCustomer, setOrderSuccess }) {
  const [canOrder, setCanOrder] = useState(false);
  const cart = useStore((state) => state.cart) || [];
  const emptyCart = useStore((state) => state.emptyCart);

  const onChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (customer.name && customer.email && customer.phone && mailformat.test(customer.email)) {
      setCanOrder(true);
    } else {
      setCanOrder(false);
    }
  }, [customer]);

  const submitOrder = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cart, customer }),
      });
      console.log(response);

      if (response.status === 200) {
        toast.success('Your order has been placed!');
        setIsOpen(false);
        emptyCart();
        setOrderSuccess(true);
      } else {
        throw new Error('There was an error, please email us directly at dannysdozens@gmail.com');
      }
    } catch (error) {
      console.log(error);
      toast.error('There was an error, please email us directly at dannysdozens@gmail.com');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} contentLabel="Add To Cart">
        <div className="relative">
          <h3 className="font-light uppercase text-gray-800 tracking-tight text-3xl md:text-4xl md:text-center ">
            Place Order
          </h3>
          <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0 text-3xl font-light md:text-4xl">
            X
          </button>
          <div className="text-sm tracking-tight md:px-20 md:text-base md:text-center py-6">
            After placing your order, we will reach out to you for payment and to confirm a few details.
          </div>
          <div className="py-2">
            <label htmlFor="name" className={labelStyles}>
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
            <label htmlFor="email" className={labelStyles}>
              Your Email
            </label>
            <input
              name="email"
              id="email"
              value={customer.email}
              type="email"
              className={inputStyles}
              onChange={onChange}
            />
          </div>
          <div className="py-2">
            <label htmlFor="phone" className={labelStyles}>
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
          {canOrder ? (
            <div className="flex flex-col-reverse flex-wrap justify-center items-center">
              <Button onClick={submitOrder} color="green" className="mx-2 mt-2 text-lg sm:text-2xl">
                Submit Order
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal>
      <ToastContainer position="bottom-right" autoClose={10000} theme="colored" />
    </>
  );
}
