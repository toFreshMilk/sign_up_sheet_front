import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  return (
    <div className="w-full px-1 text-gray-700">
      {props.meta}
      <div className="w-full bg-header p-5">
        <img
          src={`${router.basePath}/assets/images/smartel_logo.png`}
          alt={'스마텔 로고'}
        />
      </div>
      <div className="mx-auto max-w-screen-md">
        <div className="content py-5 text-xl">{props.children}</div>
        <div className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
          by <a href="https://smartelmobile.com">Smartel</a>
        </div>
      </div>
    </div>
  );
};

export { Main };
