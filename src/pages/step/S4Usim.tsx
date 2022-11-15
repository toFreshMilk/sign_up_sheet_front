import { Listbox, RadioGroup, Tab, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import Modal from 'react-modal';

import { Main } from '@/templates/Main';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#120909" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#9d1818"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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
    {
      title: 'eSim 사용',
      subTitle: '(eSIM 지원 휴대폰)',
      esim: {
        manufacturer: ['애플', '삼성', '기타'],
        modelName: ['모델1', '모델2', '모델3'],
        capacity: ['500M', '1G', '2G'],
      },
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
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
              <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    휴대폰 정보(eSIM)
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        제조사
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <div className="mx-auto w-full max-w-md">
                          <RadioGroup>
                            <RadioGroup.Label className="sr-only">
                              제조사 선택
                            </RadioGroup.Label>
                            <div className="space-x-5 flex flex-row">
                              {usimTypes[2]?.esim?.manufacturer?.map(
                                (factory, i) => (
                                  <RadioGroup.Option
                                    key={factory + i}
                                    value={factory}
                                    className={({ active, checked }) =>
                                      `${
                                        active
                                          ? 'ring-2 ring-[#b52323]'
                                          : 'ring-2 ring-[#140f0f]'
                                      }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex w-1/3 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <div className="flex w-full items-center justify-between">
                                          <div className="text-sm">
                                            <RadioGroup.Label
                                              as="p"
                                              className={`font-medium  ${
                                                checked
                                                  ? 'text-[#b52323]'
                                                  : 'text-gray-900'
                                              }`}
                                            >
                                              {factory}
                                              {String(active)}
                                            </RadioGroup.Label>
                                          </div>
                                          {checked && (
                                            <div className="shrink-0 text-white">
                                              <CheckIcon className="h-6 w-6" />
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                )
                              )}
                            </div>
                          </RadioGroup>
                        </div>
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        단말 정보
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              모델명
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <div className="mx-auto w-full max-w-md">
                                <RadioGroup>
                                  <RadioGroup.Label className="sr-only">
                                    단말기 모델명 선택
                                  </RadioGroup.Label>
                                  <div className="flex flex-row space-x-5">
                                    <Listbox>
                                      <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                          <span className="block truncate">
                                            ㅇㄹㄴㅇㄹㅇㄴㄹ
                                          </span>
                                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" />
                                        </Listbox.Button>
                                        <Transition
                                          as={Fragment}
                                          leave="transition ease-in duration-100"
                                          leaveFrom="opacity-100"
                                          leaveTo="opacity-0"
                                        >
                                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {usimTypes[2]?.esim?.modelName?.map(
                                              (person, personIdx) => (
                                                <Listbox.Option
                                                  key={personIdx}
                                                  className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                      active
                                                        ? 'bg-amber-100 text-amber-900'
                                                        : 'text-gray-900'
                                                    }`
                                                  }
                                                  value={person}
                                                >
                                                  {({ selected }) => (
                                                    <>
                                                      <span
                                                        className={`block truncate ${
                                                          selected
                                                            ? 'font-medium'
                                                            : 'font-normal'
                                                        }`}
                                                      >
                                                        {person}
                                                      </span>
                                                      {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                          <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                          />
                                                        </span>
                                                      ) : null}
                                                    </>
                                                  )}
                                                </Listbox.Option>
                                              )
                                            )}
                                          </Listbox.Options>
                                        </Transition>
                                      </div>
                                    </Listbox>
                                  </div>
                                </RadioGroup>
                              </div>
                            </dd>
                          </div>
                        </dl>
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        <button
                          type="button"
                          onClick={openModal}
                          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          단말 정보 보는 방법
                        </button>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="imei1"
                                className="block text-sm font-medium text-gray-700"
                              >
                                imei1
                              </label>
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="imei1"
                                id="imei1"
                                autoComplete="given-name"
                                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                        </dl>
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="imei2"
                                className="block text-sm font-medium text-gray-700"
                              >
                                imei2
                              </label>
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="imei2"
                                id="imei2"
                                autoComplete="given-name"
                                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                        </dl>
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="EID"
                                className="block text-sm font-medium text-gray-700"
                              >
                                EID
                              </label>
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="EID"
                                id="EID"
                                autoComplete="given-name"
                                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                        </dl>
                      </dd>
                      <Modal isOpen={modalOpen}>
                        <p onClick={closeModal}>dddddddddddddddddddf</p>
                      </Modal>
                    </div>
                  </dl>
                </div>
              </div>
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
