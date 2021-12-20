import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Menu from '@/components/menu';

export default function Header({ title }) {
  const logo = useRef();

  useEffect(() => {
    gsap.from(logo.current, {
      scale: 0,
      y: 100,
      opacity: 0,
      duration: 2,
      transformOrigin: 'top center',
      ease: 'elastic.out(1, 0.8)',
    });
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <header className="py-3 h-36 flex justify-center">
        <div ref={logo}>
          <Link href="/" passHref>
            <a>
              <Image width={120} height={120} src="/logo.jpeg" />
            </a>
          </Link>
        </div>
      </header>
    </>
  );
}
