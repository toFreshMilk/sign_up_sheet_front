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
        <div className="content text-xl px-[24px] pt-[20px] pb-[32px] max-w-[480px] m-auto">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export { Main };
