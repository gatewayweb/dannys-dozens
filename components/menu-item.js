import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal from 'react-modal';

import useStore from '@/lib/store';

const modalStyles = {
  content: {
    width: '600px',
    maxWidth: '90%',
    height: 'auto',
    minHeight: '0px',
    boxShadow: '5px 6px 25px 0px rgba(0,0,0,0.1)',
    border: 'none',
    borderRadius: '8px',
    position: 'static',
  },
  overlay: {
    zIndex: '50',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(10px)',
  },
};

export default function MenuItem({ item }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [added, setAdded] = useState(null);
  const addToCart = useStore((state) => state.addToCart);

  const AddButton = ({ size }) => {
    return (
      <button
        onClick={() => {
          setAdded({ ...item, size });
          addToCart(item, size);
        }}
        className="bg-yellow-400 border-b-4 border-l-4 border-yellow-500 text-gray-800 w-full py-3 rounded-lg text-2xl hover:bg-yellow-500"
      >
        <div className=" text-5xl">+</div>
        {size}
      </button>
    );
  };

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="px-2 py-8 text-center border-b-2 border-gray-200">
          <Image height={100} width={100} src="/cookie.png" />
          <h3 className="text-yellow-600 font-bold text-3xl font-script mt-2">{item.name}</h3>
          <div className="text-sm text-gray-500 leading-tight mt-2">{item.description}</div>
          <div className="text-gray-700 text-lg grid grid-cols-2 mt-4 w-full sm:w-[250px] mx-auto max-w-full">
            <div className="col-span-1 text-center border-r border-gray-300">
              <div className="text-xs text-gray-500 pb-1">HALF DOZEN</div>
              <div className="font-bold text-2xl">${item.pricing.pricePerHalfDozen}</div>
            </div>
            <div className="col-span-1 text-center">
              <div className="text-xs text-gray-500 pb-1">DOZEN</div>
              <div className="font-bold text-2xl">${item.pricing.pricePerDozen}</div>
            </div>
          </div>
          <div className="pt-6">
            <button
              onClick={() => {
                setIsOpen(true);
              }}
              className="bg-yellow-400 text-gray-800 rounded-full px-8 py-2 font-bold border-b border-yellow-700 duration-150 hover:bg-yellow-500"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
      <Modal
        style={modalStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        contentLabel="Add To Cart"
        ariaHideApp={false}
      >
        <h3 className="font-light uppercase text-center text-gray-800 text-4xl tracking-tight">
          Add<strong className="block">{item.name}</strong>
        </h3>
        {/* <div className="pt-2 text-center text-gray-400">How many cookies do you want?</div> */}
        <div className="flex flex-wrap pt-6">
          <div className="w-full md:w-1/2 px-2 pb-6 md:pb-2">
            <AddButton size="Half Dozen" />
          </div>
          <div className="w-full md:w-1/2 px-2 pb-2">
            <AddButton size="Dozen" />
          </div>
        </div>
        {added ? (
          <>
            <div className="mx-2 text-center mt-4 bg-green-600 rounded text-white py-3">
              {item.name} ({added.size}) added to your order.
            </div>
            <div className="flex flex-wrap pt-6">
              <div className="w-full md:w-1/2 px-2 pb-6 md:pb-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="font-bold bg-gray-200 border-b-2 border-l-2 border-gray-300 text-gray-800 w-full py-2 rounded hover:bg-gray-300"
                >
                  Add More Cookies
                </button>
              </div>
              <div className="w-full md:w-1/2 px-2 pb-2">
                <Link href="/order">
                  <a className="font-bold block text-center bg-green-600 border-b-2 border-l-2 border-green-700 text-white w-full py-2 rounded hover:bg-green-700">
                    View my Order
                  </a>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}
