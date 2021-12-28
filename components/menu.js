import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import useStore from '@/lib/store';

const MenuBar = () => {
  return <div className="h-[4px] rounded w-full transition-all duration-300 bg-gray-600 group-hover:bg-gray-800"></div>;
};

const links = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/menu',
    text: 'Menu',
  },
  {
    href: '/order',
    text: 'My Order',
  },
  {
    href: 'mailto:dannysdozens@gmail.com',
    text: 'Contact',
  },
];

export default function Menu() {
  const menu = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const cart = useStore((state) => state.cart);

  useEffect(() => {
    if (cart && cart.length) {
      let newQuantity = 0;
      cart.forEach((item) => {
        newQuantity += parseInt(item.quantity);
      });
      setCartQuantity(newQuantity);
    } else {
      setCartQuantity(0);
    }
  }, [cart]);

  useEffect(() => {
    if (showMenu) {
      gsap.fromTo(menu.current, { x: 800 }, { opacity: 1, x: 0, duration: 0.75, ease: 'elastic.out(1, 0.8)' });
    } else {
      gsap.to(menu.current, { x: 800, opacity: 0, duration: 0.5 });
    }
  }, [showMenu]);

  return (
    <>
      {!showMenu ? (
        <div className="fixed top-12 right-12 z-30 flex">
          <button
            onClick={() => {
              setShowMenu(true);
            }}
            className="group w-12 h-11 flex flex-col rounded justify-between transition-all bg-white p-2 bg-opacity-95"
          >
            <MenuBar />
            <MenuBar />
            <MenuBar />
          </button>
          <Link href="/order" passHref>
            <a className="relative group w-12 h-11 ml-2 flex flex-col rounded justify-between transition-all bg-white p-2 bg-opacity-95">
              <img className="opacity-80 relative top-[-2px]" src="/bag.png" />
              <div className="absolute w-5 h-5 rounded-full bg-yellow-400 text-gray-800 flex justify-center items-center text-xs right-1 bottom-0 border-2 border-white">
                {cartQuantity}
              </div>
            </a>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div
        ref={menu}
        className="opacity-50 drop-shadow-lg translate-x-[800px] fixed h-screen w-screen bg-gray-800 z-20 flex flex-col justify-center text-center right-0 top-0 md:rounded-lg md:overflow-hidden md:right-5 md:top-5 md:h-auto md:w-[300px]"
      >
        {links.map((link, index) => {
          return (
            <Link key={index} href={link.href} passHref>
              <a className="block text-3xl uppercase font-bold text-white py-8 border-b border-gray-700 first:border-t hover:bg-gray-700">
                {link.text}
              </a>
            </Link>
          );
        })}
        <button
          onClick={() => {
            setShowMenu(false);
          }}
          className="absolute top-0 left-0 w-full py-3 bg-gray-900 uppercase text-gray-400 font-bold md:static hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </>
  );
}
