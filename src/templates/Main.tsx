import type { ReactNode } from 'react';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <div className="w-full text-gray-700">
      {props.meta}
      <div className="mx-auto max-w-screen-md">
        <div className="content m-auto max-w-[480px] px-[24px] pt-[48px] pb-[32px] text-xl">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export { Main };
