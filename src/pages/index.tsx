import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import oracledb from 'oracledb';

axios.defaults.withCredentials = true;

// 빌드타임에만 한번 호출됨.
export async function getStaticProps() {
  console.log(process.env.NEXT_PUBLIC_API_URL, 'getStaticProps');

  const configOracle40 = {
    user: 'mvno',
    password: 'mvno',
    connectString: '61.41.9.40/ORCL',
  };
  const binds = {};
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    autoCommit: true,
  };

  const init = () => {
    try {
      console.log('initddddddddddddddddddddddddd');
      oracledb.initOracleClient({ libDir: 'C:\\instantclient_21_3' });
    } catch (e) {
      console.log('oracle init catch');
      console.log(e);
    }
  };
  init();

  const getPhoneNumber = async () => {
    let result;
    try {
      const connection = await oracledb.getConnection(configOracle40);
      result = await connection.execute(
        `select SUBSCRIBER_NO, CONTRACT_NUM from MVNO.CS_PPS_VACCT_INICIS where KIND = 'K' and USEABLE = 'Y'`,
        binds,
        options
      );

      await connection.close();
      // console.log(result);
    } catch (e) {
      result = 'err';
      console.log('getPhoneNumber await oracledb.getConnection', e);
    }
    return result;
  };
  const ccc = await getPhoneNumber();
  return {
    props: { dd: ccc },
  };
}

const Index = (_a: any) => {
  const router = useRouter();

  // const MOBILE_OS = {
  //   IOS: false,
  //   Android: 'Android',
  // } as const;

  const dddd = () => {
    console.log(_a, '_a');
    // axios('http://t-esim.smartelmobile.com/api').then((response) => {
    //   console.log(response);
    // });
    // const url = process.env.NEXT_PUBLIC_API_URL;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api`).then((response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    // console.log(MOBILE_OS);
    console.log(_a, 'useEffect');
    console.log(process.env.NODE_ENV);
    console.log(process.env.ENV_VARIABLE);
    console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
    console.log(process.env.hi);
    // console.log(process.env.NEXT_PUBLIC_API_URL);
    // console.log(process.env.NEXT_PUBLIC_API_URL2);
    //
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <a href="https://github.com/ixartz/Next-js-Boilerplate">
        <img
          src={`${router.basePath}/assets/images/nextjs-starter-banner.png`}
          alt="Nextjs starter banner"
        />
      </a>
      <h1 className="hidden bg-slate-300 text-2xl font-bold md:flex lg:bg-orange-400 xl:bg-purple-300 2xl:bg-amber-300">
        Boilerplate code for your Nextjs project with Tailwind CSS ==
        {router.basePath}
      </h1>
      <p>
        <span role="img" aria-label="rocket">
          🚀
        </span>{' '}
        Next.js Boilerplate is a starter code for your Next js project by
        putting developer experience first .{' '}
        <span role="img" aria-label="zap">
          ⚡️
        </span>{' '}
        Made with Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged,
        VSCode, Netlify, PostCSS, Tailwind CSS.
      </p>
      <h2 className="text-lg font-semibold">Next js Boilerplate Features</h2>
      <p>Developer experience first:</p>
      <ul>
        <li>
          <button onClick={dddd}>ddddddddddd</button>
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          <a href="https://nextjs.org" rel="nofollow">
            Next.js
          </a>{' '}
          for Static Site Generator
        </li>
        <li>
          <span role="img" aria-label="art">
            🎨
          </span>{' '}
          Integrate with{' '}
          <a href="https://tailwindcss.com" rel="nofollow">
            Tailwind CSS
          </a>
        </li>
        <li>
          <span role="img" aria-label="nail_care">
            💅
          </span>{' '}
          PostCSS for processing Tailwind CSS
        </li>
        <li>
          <span role="img" aria-label="tada">
            🎉
          </span>{' '}
          Type checking Typescript
        </li>
        <li>
          <span role="img" aria-label="pencil2">
            ✏️
          </span>{' '}
          Linter with{' '}
          <a href="https://eslint.org" rel="nofollow">
            ESLint
          </a>
        </li>
        <li>
          <span role="img" aria-label="hammer_and_wrench">
            🛠
          </span>{' '}
          Code Formatter with{' '}
          <a href="https://prettier.io" rel="nofollow">
            Prettier
          </a>
        </li>
        <li>
          <span role="img" aria-label="fox_face">
            🦊
          </span>{' '}
          Husky for Git Hooks
        </li>
        <li>
          <span role="img" aria-label="no_entry_sign">
            🚫
          </span>{' '}
          Lint-staged for running linters on Git staged files
        </li>
        <li>
          <span role="img" aria-label="no_entry_sign">
            🗂
          </span>{' '}
          VSCode configuration: Debug, Settings, Tasks and extension for
          PostCSS, ESLint, Prettier, TypeScript
        </li>
        <li>
          <span role="img" aria-label="robot">
            🤖
          </span>{' '}
          SEO metadata, JSON-LD and Open Graph tags with Next SEO
        </li>
        <li>
          <span role="img" aria-label="robot">
            ⚙️
          </span>{' '}
          <a
            href="https://www.npmjs.com/package/@next/bundle-analyzer"
            rel="nofollow"
          >
            Bundler Analyzer
          </a>
        </li>
        <li>
          <span role="img" aria-label="rainbow">
            🌈
          </span>{' '}
          Include a FREE minimalist theme
        </li>
        <li>
          <span role="img" aria-label="hundred">
            💯
          </span>{' '}
          Maximize lighthouse score
        </li>
      </ul>
      <p>Built-in feature from Next.js:</p>
      <ul>
        <li>
          <span role="img" aria-label="coffee">
            ☕
          </span>{' '}
          Minify HTML &amp; CSS
        </li>
        <li>
          <span role="img" aria-label="dash">
            💨
          </span>{' '}
          Live reload
        </li>
        <li>
          <span role="img" aria-label="white_check_mark">
            ✅
          </span>{' '}
          Cache busting
        </li>
      </ul>
      <h2 className="text-lg font-semibold">Our Stater code Philosophy</h2>
      <ul>
        <li>Minimal code</li>
        <li>SEO-friendly</li>
        <li>
          <span role="img" aria-label="rocket">
            🚀
          </span>{' '}
          Production-ready
        </li>
      </ul>
      <p>
        Check our GitHub project for more information about{' '}
        <a href="https://github.com/ixartz/Next-js-Boilerplate">
          Nextjs Boilerplate
        </a>
        . You can also browse our{' '}
        <a href="https://creativedesignsguru.com/category/nextjs/">
          Premium NextJS Templates
        </a>{' '}
        on our website to support this project.
      </p>
    </Main>
  );
};

export default Index;
