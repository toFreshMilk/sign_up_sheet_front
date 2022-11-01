import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { Bugger } from '@/layouts/bugger';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <Bugger />
      <div className="w-full bg-header px-10 antialiased">
        <img
          src={`${router.basePath}/assets/images/smartel_logo.png`}
          alt={'스마텔 로고'}
        />
        <h1 className="text-center text-white">온라인 가입 신청서</h1>
      </div>
      <div className="mx-auto max-w-screen-md">

        <div className="content py-5 text-xl">{props.children}</div>

        <div className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
          <span role="img" aria-label="Love">
            ♥
          </span>{' '}
          by <a href="https://creativedesignsguru.com">Smartel</a>
        </div>
      </div>
    </div>
  );
};

export { Main };
