import '../styles/globals.css';
import Link from 'next/link';

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
        Copyright 2021 Dannysdozens.com
        <div className="flex flex-wrap">
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
      </footer>
    </div>
  );
}

export default App;
