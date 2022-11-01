import '../styles/global.css';

import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { AppConfig } from '@/utils/AppConfig';

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
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
