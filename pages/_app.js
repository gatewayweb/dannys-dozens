import '../styles/globals.css';
import Link from 'next/link';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import useStore, { updateLocalStorage } from '@/lib/store';

function App({ Component, pageProps }) {
  useStore.subscribe(
    (state) => state.cart,
    (cart) => {
      updateLocalStorage(cart);
    },
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Component {...pageProps} />

      <footer className="flex flex-col items-center justify-center w-full py-8 bg-gray-800 text-gray-300 font-light uppercase tracking-widest">
        <div className="pb-2 flex flex-wrap">
          <a target="_blank" href="https://www.instagram.com/dannysdozens/">
            <FontAwesomeIcon
              icon={faInstagram}
              className="mx-3 duration-200 text-gray-300 hover:text-gray-100"
              size="2x"
            />
          </a>
          <a target="_blank" href="https://facebook.com">
            <FontAwesomeIcon
              icon={faFacebook}
              className="mx-3 duration-200 text-gray-300 hover:text-gray-100"
              size="2x"
            />
          </a>
        </div>
        <div className="flex flex-wrap pb-3">
          <Link href="/menu" passHref>
            <a className="text-sm block mx-2 mt-2 text-gray-100">Menu</a>
          </Link>
          <Link href="/order" passHref>
            <a className="text-sm block mx-2 mt-2 text-gray-100">Order</a>
          </Link>
          <Link href="mailto:dannysdozens@gmail.com" passHref>
            <a className="text-sm block mx-2 mt-2 text-gray-100">Contact</a>
          </Link>
        </div>
        Copyright 2021 Dannysdozens.com
      </footer>
    </div>
  );
}

export default App;
