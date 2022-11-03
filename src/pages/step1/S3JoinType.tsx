import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';

const S3JoinType = () => {
  const router = useRouter();
  const [joinTypes] = useState([
    {
      title: '번호 이동',
      subTitle: '지금 사용중인 휴대폰 번호 그대로 사용할래요',
    },
    { title: '신규 가입', subTitle: '새로운 휴대폰 번호로 부여 받을래요' },
  ]);
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className={'flex justify-center text-4xl font-bold'}>
          어떤 방법으로 가입을 진행할까요?
        </h2>
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6 flex justify-center">
          <fieldset>
            <div className="mt-4 space-y-4">
              {joinTypes.map((item) => (
                <button
                  key={item.title}
                  onClick={() => {
                    sessionStorage.setItem('S3JoinType', item.title);
                    router.push('/step2/S1Usim');
                  }}
                  className="group relative flex w-full items-center rounded-md border bg-[#e0e0e0] py-2 px-4 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <div className={'text-left'}>
                    <h3 className={'mb-2 text-3xl font-bold'}>{item.title}</h3>
                    <h5 className={'mb-2'}>{item.subTitle}</h5>
                  </div>
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </Main>
  );
};

export default S3JoinType;
