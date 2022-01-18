import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import useStore from '@/lib/store';

const MenuBar = () => {
  return <div className="h-[2px] rounded w-full transition-all duration-300 bg-gray-600 group-hover:bg-gray-800"></div>;
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
        <div className="fixed top-12 right-12 z-30 flex items-center">
          <button
            onClick={() => {
              setShowMenu(true);
            }}
            className="group w-12 h-10 flex flex-col rounded justify-between transition-all bg-white p-2 bg-opacity-95"
          >
            <MenuBar />
            <MenuBar />
            <MenuBar />
          </button>
          <Link href="/order" passHref>
            <a className="relative group w-12 h-11 ml-2 flex flex-col rounded justify-between transition-all bg-white p-2 bg-opacity-95">
              {/* <img className="opacity-80 relative top-[-2px]" src="/bag.png" />
               */}
              <div className="w-6 h-6">
                <svg viewBox="0 0 1330 1610" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M36.5 443C36.5 324.2 115.167 312.5 154.5 321.5C282.543 321.5 474.618 358.5 660.5 358.5C871.419 358.5 1073.36 321.5 1146.5 321.5C1284.1 321.5 1300.5 402.5 1291.5 443C1290.33 611.667 1288.7 1000.3 1291.5 1205.5C1294.3 1410.7 1040.67 1529.67 913.5 1563.5C783 1574.67 478.8 1586.2 306 1543C133.2 1499.8 54.3333 1300 36.5 1205.5V443Z"
                    stroke="#383838"
                    stroke-width="72"
                  />
                  <path
                    d="M185.5 173C175 214 151.4 314.4 207 320C238.964 323.219 438.266 356.78 654 356C813.519 355.424 972.999 346.948 1098.5 320C1125.67 314.167 1162.5 265.5 1142.5 175.5"
                    stroke="#383838"
                    stroke-width="52"
                  />
                  <path
                    d="M206 202C234.8 211.6 520.667 228.667 660 236C749.5 236 958.9 231.9 1080.5 215.5C1232.5 195 1153 151 1129.5 140.5C1106 130 863.5 97 838.5 92.0002L837.782 91.8567C812.81 86.8652 777.2 79.7475 798 53.5002C841.2 10.3003 787.667 0.166876 755.5 0.500158C735.333 0.333491 672.8 0.100158 584 0.500158C473 1.00016 506.5 42.5002 514.5 53.5002C522.5 64.5002 524 78.0002 490 92.0002C456 106 296 118 206 140C116 162 170 190 206 202Z"
                    fill="#383838"
                  />
                  <path
                    d="M767.703 87H540.149C540.149 135.469 426.622 140.242 338.102 149.055C267.285 156.105 308.595 164.966 338.102 168.516C390.614 175.125 607.165 181 663.178 181C719.191 181 845.721 178.43 970.25 170.352C1094.78 162.273 935.242 142.812 845.721 133.633C774.104 126.289 763.868 99.4844 767.703 87Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div className="absolute w-5 h-5 rounded-full bg-yellow-400 text-gray-800 flex justify-center items-center text-xs right-2 bottom-0 border border-white">
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
