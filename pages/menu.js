import Image from 'next/image';

import Header from '@/components/header';
import { getMenuPage } from 'lib/api';

export default function Menu({ page, menu }) {
  const menuItems = menu?.menuItems;
  return (
    <>
      <Header title="Dannys Dozens" />
      <main className="px-6 pt-12">
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-white p-8 min-h-[800px] max-w-full mx-auto">
          {/* <Image layout="fill" src={menu.backgroundImage.url} /> */}
          {/* <h1 className="relative font-bold text-center text-gray-200 mb-4">{page.title}</h1> */}
          <div className="relative flex flex-wrap justify-center w-full">
            {menuItems &&
              menuItems.map((item) => {
                return (
                  <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                    <div className="px-2 py-8 text-center border-b-2 border-gray-100">
                      <Image height={100} width={100} src="/cookie.png" />
                      <h3 className="text-yellow-600 font-bold text-3xl font-script mt-2">{item.name}</h3>
                      <div className="text-sm text-gray-500 leading-tight mt-2">{item.description}</div>
                      <div className="text-gray-700 text-lg grid grid-cols-2 mt-4 w-full sm:w-[250px] mx-auto max-w-full">
                        <div className="col-span-1 text-center border-r border-gray-300">
                          <div className="text-xs text-gray-400 pb-1">PER DOZEN</div>
                          <div className="font-bold text-2xl">${item.pricing.pricePerDozen}</div>
                        </div>
                        <div className="col-span-1 text-center">
                          <div className="text-xs text-gray-400 pb-1">PER 1/2 DOZEN</div>
                          <div className="font-bold text-2xl">${item.pricing.pricePerHalfDozen}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const data = (await getMenuPage()) || {};

  return {
    props: data,
  };
}
