import { RadioGroup, Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const S1Usim = () => {
  const router = useRouter();
  const [usimTypes] = useState([
    { title: '유심 보유중', subTitle: '(새로 구매한 유심)' },
    {
      title: '유심 없음',
      subTitle: '(택배 신청)',
      nomalOrNFC: [
        { name: '일반 유심', coment: '유심비도 무료, 배송비도 무료입니다.' },
        {
          name: 'NFC 유심',
          coment: '유심비 4,400원 청구될 예정이며, 배송비는 무료입니다.',
        },
      ],
    },
    { title: 'eSim 사용', subTitle: '(eSIM 지원 휴대폰)' },
  ]);
  return (
    <Main>
      <div className="w-full p-5 sm:px-0">
        <h2 className={'flex justify-center py-10 text-4xl font-bold'}>
          유심 주문 옵션을 선택해주세요
        </h2>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {usimTypes.map((usimType) => (
              <Tab
                key={usimType.title}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                <h2 className={'mb-2 text-2xl font-bold'}>{usimType.title}</h2>
                <h3 className={'mb-2'}>{usimType.subTitle}</h3>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <h4>유심번호 빨간색 표기부분 전체를 입력해주세요</h4>
              <img
                src={`${router.basePath}/assets/images/nextjs-starter-banner.png`}
                alt={'이미지'}
              />
              <div className="border-4">
                <input
                  type="text"
                  name="usimNumber"
                  id="usimNumber"
                  placeholder={'USIM 번호'}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                />
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <RadioGroup className="mt-4">
                {usimTypes[1]?.nomalOrNFC?.map((item, i) => (
                  <div key={item.name + i}>
                    <RadioGroup.Option
                      value={item}
                      className={({ active }) =>
                        `${classNames(
                          'bg-white shadow-sm text-gray-900 cursor-pointer',
                          active ? 'ring-2 ring-indigo-500' : '',
                          'group relative border rounded-md py-3 px-4 text-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                        )} m-10`
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="span">
                            {item.name}
                          </RadioGroup.Label>
                          <span
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked
                                ? 'border-indigo-500'
                                : 'border-transparent',
                              'pointer-events-none absolute -inset-px rounded-md'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                    <p>{item.coment}</p>
                  </div>
                ))}
              </RadioGroup>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <p>3333333333</p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <button
        onClick={() => {
          sessionStorage.setItem('S4Usim', '');
          router.push('./S5');
        }}
        className="group relative flex w-full justify-center rounded-md border bg-[#32b2df] py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        다음
      </button>
    </Main>
  );
};

export default S1Usim;
