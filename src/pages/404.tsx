import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

// 빌드타임에만 한번 호출됨.
export async function getStaticProps() {
  // api를 호출해야 의미 있음, 화면 그리기 전에 필요한 데이터 수집
  // 접속한 디바이스 정보를 알면 아예 전용 화면을 그릴수 있을듯? 하지만 소스가 두벌이 되버림.
  // 그래도 알면 좋을듯?
  // 근데 모든 페이지에서 호출하긴 좀 별론데...
  // 하위 페이지로 바로 들어올 수도 있기 때문에..
  //
  // css 템플릿 적당한게 있는지 찿ㅈ아보면 될듯
  // console.log(process.env.NEXT_PUBLIC_API_URL, 'getStaticProps');
  return {
    props: { dd: 'ccc' },
  };
}

const Index = (_a: any) => {
  const router = useRouter();

  useEffect(() => {
    // console.log(MOBILE_OS);
    // console.log(_a, 'useEffect');
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
    // console.log(process.env.hi);
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
        404404404404404404404404404404404
      </p>
    </Main>
  );
};

export default Index;
