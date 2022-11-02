import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { SwrToken } from '@/utils/Swr';

// 빌드타임에만 한번 호출됨.
export async function getStaticProps() {
  // 접속한 디바이스 정보를 알면 아예 전용 화면을 그릴수 있을듯? 하지만 소스가 두벌이 되버림.
  // 근데 모든 페이지에서 호출하긴 좀 별론데...
  // css 템플릿 적당한게 있는지 찿ㅈ아보면 될듯
  // console.log(process.env.NEXT_PUBLIC_API_URL, 'getStaticProps');
  return {
    props: { dd: 'ccc' },
  };
}

const Index = (_a: any) => {
  const router = useRouter();
  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Cache: 'no-cache',
    },
    credentials: 'include',
  };

  const { token } = SwrToken();
  const callToken = async () => {
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/getToken`;
    const aaaa = await axios.post(tokenUrl);
    console.log(aaaa);
    // setToken(data);
  };
  const callTokenConfirm1 = async () => {
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/sessionConfirm1`;
    const { data } = await axios.post(tokenUrl, {}, headers);
    console.log(data);
  };
  const callTokenConfirm2 = async () => {
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/sessionConfirm2`;
    const { data } = await axios.post(tokenUrl, {}, headers);
    console.log(data);
  };
  const getTest = async () => {
    const testUrl = `${process.env.NEXT_PUBLIC_API_URL}/test`;
    const params = {
      retType: 'M',
      bsRegNo: '',
      custDvCd: 'I',
      custKdCd: '01',
      userId: '1412116902',
      mrktCd: 'YYT',
      token,
    };
    const ff = await axios.post(testUrl, params);
    console.log(ff.data);
  };

  useEffect(() => {
    // console.log(MOBILE_OS);
    // console.log(_a, 'useEffect');
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
    // console.log(process.env.hi);
    // console.log(process.env.NEXT_PUBLIC_API_URL);
    // console.log(process.env.NEXT_PUBLIC_API_URL2);
    //
    router.push('/s1_joinTypes/S1UserType');
  }, []);

  return (
    <Main
      meta={
        <Meta
          title={`Smartel 온라인 가입 신청서 메인인덱스`}
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
      <h1>
        <button onClick={getTest}>getTestgetTestgetTestgetTestgetTest</button>
      </h1>
      <h1>
        <button onClick={callTokenConfirm1}>callTokenConfirm1</button>
      </h1>
      <h1>
        <button onClick={callTokenConfirm2}>callTokenConfirm2</button>
      </h1>
      <h1>
        <button onClick={callToken}>callToken</button>
      </h1>
      <p>
        <span role="img" aria-label="rocket">
          🚀
        </span>{' '}
        {token} nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
        <span role="img" aria-label="zap" /> Made with Next.js, TypeScript,
        ESLint, Prettier, Husky, Lint-Staged, VSCode, Netlify, PostCSS, Tailwind
        CSS.
      </p>
      <h2 className="text-lg font-semibold">Next js Boilerplate Features</h2>
      <p>Developer experience first:</p>
      <ul>
        <li>
          <button onClick={callToken}>getTokengetTokengetTokengetToken</button>
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          <a href="https://nextjs.org" rel="nofollow">
            Next.js
          </a>{' '}
          for Static Site Generator
        </li>
        <li>
          <button onClick={getTest}>testtesttesttesttest</button>
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
