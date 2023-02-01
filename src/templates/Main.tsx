import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();
  return (
    <div className="w-full text-gray-700">
      {props.meta}
      <div className="w-full bg-header p-5">
        <img
          src={`${router.basePath}/assets/images/smartel_logo.png`}
          alt={'스마텔 로고'}
          onClick={() => {
            router.push('/step/S1UserType/');
          }}
        />
      </div>
      <div className="mx-auto max-w-screen-md">
        <div className="content text-xl px-10 py-5">{props.children}</div>
      </div>
    </div>
  );
};

export { Main };
