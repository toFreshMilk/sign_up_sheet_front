import '../styles/global.css';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { AppConfig } from '@/utils/AppConfig';
import { useEffect, useState } from 'react';
import { Context } from '@/utils/Context';

const DEFAULT_SEO = {
  title: AppConfig.title,
  description: AppConfig.description,
  canonical: 'https://www.smartelmobile.com',
  openGraph: {
    type: 'website',
    locale: AppConfig.locale,
    url: 'https://www.join.smartelmobile.com',
    images: [
      {
        url: '/public/assets/images/smartel_logo',
        width: 285,
        height: 167,
        alt: '이미지',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};
const initialState = {
  feeId: '',
};
function setLocalStorage(key: string, value: any) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
}

function getLocalStorage(key: string, initialValue: any) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [total, setTotal] = useState(() =>
    getLocalStorage('total', initialState)
  ) as any;
  useEffect(() => {
    setLocalStorage('total', total);
  }, [total]);
  return (
    <Context.Provider value={{ total, setTotal }}>
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
    </Context.Provider>
  );
};

export default MyApp;
