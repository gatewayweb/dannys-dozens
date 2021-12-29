import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

import useStore, { updateLocalStorage } from '@/lib/store';
import Footer from '@/components/footer';

function App({ Component, pageProps }) {
  const setOrderTotal = useStore((state) => state.setOrderTotal);

  useStore.subscribe(
    (state) => state.cart,
    (cart) => {
      updateLocalStorage(cart);
      setOrderTotal();
    },
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default App;
