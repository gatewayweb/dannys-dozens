import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import useStore from '@/lib/store';

export default function OrderItem({ cartItem, index }) {
  const cookieImage = useRef();

  const updateQuantity = useStore((state) => state.updateCartItemQuantity);
  const removeItem = useStore((state) => state.removeFromCart);

  useEffect(() => {
    gsap.to(cookieImage.current, { rotate: '360deg', duration: 60, repeat: -1, ease: 'none' });
  }, []);

  const { item, size, quantity } = cartItem;
  return (
    <div className="bg-white border border-b-4 border-gray-200 rounded-lg mb-5 px-6 py-4 flex flex-col md:flex-row items-center justify-between transition-all duration-200">
      <div className="flex flex-col justify-center items-center md:flex-row">
        <div className="rounded-full overflow-hidden" ref={cookieImage}>
          <Image src={item.images[0].url} width={100} height={100} />
        </div>
        <h3 className="font-bold leading-tight text-center pl-4 md:text-xl lg:text-2xl md:text-left">
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
      </div>
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
          className="rounded-full px-4 py-1 sm:ml-6 text-sm uppercase text-white mt-5 bg-gray-400 sm:mt-3 md:mt-0 hover:bg-gray-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
