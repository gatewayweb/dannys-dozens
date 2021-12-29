import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

import Modal from '@/lib/modal';
import useStore from '@/lib/store';
import Button from './button';

export default function MenuItem({ item }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [added, setAdded] = useState(null);
  const addToCart = useStore((state) => state.addToCart);

  const AddButton = ({ size }) => {
    return (
      <Button
        onClick={() => {
          setAdded({ ...item, size });
          addToCart(item, size);
          toast.success(`${item.name} (${size}) added to your order.`);
        }}
        className="w-full py-3 text-2xl"
      >
        <div className="text-5xl">+</div>
        {size}
      </Button>
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
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              className=""
            >
              Add to Order
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} setIsOpen={setIsOpen} contentLabel="Add To Cart">
        <div className="relative">
          <h3 className="font-light uppercase text-center text-gray-800 text-4xl tracking-tight">
            Add<strong className="block">{item.name}</strong>
          </h3>
          <button onClick={() => setIsOpen(false)} className="absolute top-0 right-0 text-3xl font-light md:text-4xl">
            X
          </button>
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
              {/* <div className="mx-2 text-center mt-4 bg-green-600 rounded text-white py-3">
              {item.name} ({added.size}) added to your order.
            </div> */}
              <div className="flex flex-wrap pt-6">
                <div className="w-full md:w-1/2 px-2 pb-6 md:pb-2">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    color="gray"
                    className="w-full"
                  >
                    Add More Cookies
                  </Button>
                </div>
                <div className="w-full md:w-1/2 px-2 pb-2">
                  <Button link="/order" color="green" className="w-full">
                    View my Order
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Modal>
    </>
  );
}
