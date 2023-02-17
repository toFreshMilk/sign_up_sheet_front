import '../styles/global.css';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import { AppConfig } from '@/utils/AppConfig';
import { getLocalStorage, setLocalStorage } from '@/utils/Commons';
import { Context } from '@/utils/Context';
import { initialState } from '@/utils/PublicData';

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
