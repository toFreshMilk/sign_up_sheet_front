import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

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
      <h1 className="bg-slate-300 lg:bg-orange-400 xl:bg-purple-300 2xl:bg-amber-300 hidden text-2xl font-bold md:flex">
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
