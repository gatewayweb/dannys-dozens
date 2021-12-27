import '../styles/globals.css';

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
      </footer>
    </div>
  );
}

export default App;
