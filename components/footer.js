import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-8 bg-gray-800 text-gray-300 font-light uppercase tracking-widest">
      <div className="pb-2 flex flex-wrap">
        <a target="_blank" href="https://www.instagram.com/dannysdozens/">
          <FontAwesomeIcon
            icon={faInstagram}
            className="mx-3 duration-200 text-gray-300 hover:text-gray-100"
            size="2x"
          />
        </a>
        <a target="_blank" href="https://www.facebook.com/Dannys-Dozens-107252415164767/">
          <FontAwesomeIcon
            icon={faFacebook}
            className="mx-3 duration-200 text-gray-300 hover:text-gray-100"
            size="2x"
          />
        </a>
      </div>
      <div className="flex flex-wrap pb-3">
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
      Copyright 2021 Dannysdozens.com
    </footer>
  );
}
