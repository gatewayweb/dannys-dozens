import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import Menu from '@/components/menu';
import { getHomepage } from 'lib/api';

const ImageSlide = ({ image }) => {
  return (
    <div className="w-screen h-screen max-w-full max-h-full relative">
      <Image src={image} layout="fill" objectFit="cover" />
    </div>
  );
};

export default function Home({ page }) {
  console.log(page);
  const logo = useRef();

  useEffect(() => {
    const home = new gsap.timeline();
    home.from(logo.current, {
      scale: 0,
      y: 100,
      opacity: 0,
      duration: 2,
      transformOrigin: 'center center',
      ease: 'elastic.out(1, 0.8)',
    });
  }, []);

  return (
    <>
      <Menu />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Head>
          <title>Dannys Dozens</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 text-center">
          <header className="py-3 h-36" ref={logo}>
            <Link href="/" passHref>
              <a>
                <Image width={120} height={120} src="/logo.jpeg" />
              </a>
            </Link>
          </header>
          <div className="h-[800px] w-screen">
            <Swiper loop speed={3000} effect="fade" autoplay={{ delay: 5000 }} modules={[Autoplay, EffectFade]}>
              {page.images &&
                page.images.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <ImageSlide image={image.url} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
          <div className="bg-gray-50 w-full py-16 rounded-t-2xl relative z-10">
            <div className="flex flex-col items-center w-full">
              <h1 className="pb-1 tracking-wider text-gray-700 font-light uppercase">{page.subtitle[0]}</h1>
              <div className="h-[1px] w-20 bg-gray-500 rounded mt-2"></div>
            </div>
            <div className="mission-statement w-[600px] max-w-full mx-auto mt-4 text-gray-500 tracking-wider px-6">
              {page.subtitle[1]}
            </div>
          </div>
        </main>

        <footer className="flex flex-col items-center justify-center w-full py-8 bg-gray-800 text-gray-300 font-light uppercase tracking-widest">
          Copyright 2021 Dannysdozens.com
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const page = (await getHomepage()) || {};
  return {
    props: page,
  };
}
