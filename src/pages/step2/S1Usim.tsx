import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';

const S1Usim = () => {
  const router = useRouter();
  const [joinTypes] = useState([
    {
      title: '유심 보유중',
      subTitle: '(새로 구매한 유심))',
    },
    { title: '유심 없음', subTitle: '(택배 신청)' },
    { title: 'eSim 사용', subTitle: '(eSIM 지원 휴대폰)' },
  ]);
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className={'flex justify-center text-4xl font-bold'}>
          유심 주문 옵션을 선택해주세요
        </h2>
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6 flex justify-center">
          <fieldset>
            <div className="mt-4 space-y-4">
              {joinTypes.map((item) => (
                <button
                  key={item.title}
                  onClick={() => {
                    sessionStorage.setItem('S3UserType', item.title);
                    router.push('/step2/S1UserType');
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

export default S1Usim;
