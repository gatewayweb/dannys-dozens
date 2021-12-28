import { ToastContainer } from 'react-toastify';

import Header from '@/components/header';
import MenuItem from '@/components/menu-item';
import { getMenuPage } from '@/lib/api';

export default function Menu({ page, menu }) {
  const menuItems = menu?.menuItems;

  return (
    <>
      <Header title="Dannys Dozens | Menu" />
      <main className="px-6 py-12">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-white p-8 min-h-[800px] max-w-full mx-auto">
          <h1 className="relative font-light text-center text-gray-500 mb-4 uppercase text-5xl">{page.title}</h1>
          <div className="relative flex flex-wrap justify-center w-full">
            {menuItems &&
              menuItems.map((item) => {
                return <MenuItem key={item.id} item={item} />;
              })}
          </div>
        </div>
      </main>

      <ToastContainer position="bottom-right" autoClose={10000} theme="colored" />
    </>
  );
}

export async function getStaticProps() {
  const data = (await getMenuPage()) || {};

  return {
    props: data,
  };
}
