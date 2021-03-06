import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import Header from '@/components/header';

import { getHomepage } from '@/lib/api';

const ImageSlide = ({ image, index }) => {
  return (
    <div className="w-screen h-screen max-w-full max-h-full relative">
      <Image src={image} layout="fill" objectFit="cover" priority={index === 0 ? true : false} />
    </div>
  );
};

export default function Home({ page }) {
  return (
    <>
      <Header title="Dannys Dozens" />
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center pt-12">
        <div className="h-[400px] lg:h-[800px] relative w-screen">
          <Swiper loop speed={3000} effect="fade" autoplay={{ delay: 5000 }} modules={[Autoplay, EffectFade]}>
            {page.images &&
              page.images.map((image, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ImageSlide image={image.url} index={index} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="bg-gray-50 w-full py-16 rounded-t-2xl relative z-10 -top-4">
          <div className="flex flex-col items-center w-full">
            <h1 className="pb-1 tracking-wider text-gray-700 font-light uppercase">{page.subtitle[2]}</h1>
            <div className="h-[1px] w-20 bg-gray-500 rounded mt-2"></div>
          </div>
          <div className="mission-statement w-[800px] max-w-full mx-auto mt-4 text-gray-600 font-normal text-2xl px-6 pb-12 italic">
            {page.subtitle[3]}
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="pb-1 tracking-wider text-gray-700 font-light uppercase">{page.subtitle[0]}</h1>
            <div className="h-[1px] w-20 bg-gray-500 rounded mt-2"></div>
          </div>
          <div className="mission-statement w-[800px] max-w-full mx-auto mt-4 text-gray-500 tracking-wider leading-7 px-6">
            {page.subtitle[1]}
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const page = (await getHomepage()) || {};

  return {
    props: page,
  };
}
