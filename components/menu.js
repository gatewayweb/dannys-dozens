import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

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
    text: 'Our Menu',
  },
  {
    href: 'mailto:dannysdozens@gmail.com',
    text: 'Contact Us',
  },
];

export default function Menu() {
  const menu = useRef();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (showMenu) {
      gsap.fromTo(menu.current, { y: -1500 }, { opacity: 1, y: 0, duration: 1, ease: 'elastic.out(1, 0.8)' });
    } else {
      gsap.to(menu.current, { y: -1500, opacity: 0 });
    }
  }, [showMenu]);

  return (
    <>
      {!showMenu ? (
        <button
          onClick={() => {
            setShowMenu(true);
          }}
          className="group fixed top-12 right-12 w-12 h-11 rounded flex flex-col justify-between transition-all hover:h-12 z-30 bg-white p-2 bg-opacity-95"
        >
          <MenuBar />
          <MenuBar />
          <MenuBar />
        </button>
      ) : (
        <></>
      )}
      <div
        ref={menu}
        className="opacity-50 drop-shadow-lg translate-y-[-1500px] fixed h-screen w-screen bg-gray-800 z-20 flex flex-col justify-center text-center right-0 top-0 md:rounded-lg md:overflow-hidden md:right-5 md:top-5 md:h-auto md:w-[300px]"
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
          className="absolute bottom-0 left-0 w-full py-3 bg-gray-900 uppercase text-gray-400 font-bold md:static hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </>
  );
}
