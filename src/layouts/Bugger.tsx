import Link from 'next/link';
import { useState } from 'react';

const Bugger = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    <div className="flex items-center justify-between border-b border-gray-400 py-8">
      <Link href="/">
        <img src="https://designbygio.it/images/logo.png" alt="logo" />
      </Link>
      <nav>
        <section className="flex lg:hidden">
          <div
            className="space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600" />
          </div>

          <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}>
            <div
              className="absolute top-0 right-0 p-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex min-h-[250px] flex-col items-center justify-between">
              <li className="my-8 border-b border-gray-400 uppercase">
                <Link href="/about">About</Link>
              </li>
              <li className="my-8 border-b border-gray-400 uppercase">
                <Link href="/portfolio">Portfolio</Link>
              </li>
              <li className="my-8 border-b border-gray-400 uppercase">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </section>

        <ul className="hidden space-x-8 lg:flex">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <style jsx>
        {`
          .hideMenuNav {
            display: none;
          }
          .showMenuNav {
            position: absolute;
            width: 100%;
            height: 100vh;
            top: 0;
            left: 0;
            background: white;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export { Bugger };
