import { RadioGroup, Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from 'react-modal';

import { Main } from '@/templates/Main';
import { CheckIcon, saveImage } from '@/utils/Commons';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const usimTypes = [
  { title: '유심 보유', subTitle: '(새로 구매한 유심)' },
  {
    title: '유심 없음',
    subTitle: '(택배 신청)',
    nomalOrNFC: [
      {
        name: '일반 유심',
        coment: '일반유심은 유심비, 배송비도 무료입니다.',
        subComent: '',
      },
      {
        name: 'NFC 유심',
        coment: 'NFC 유심은 유심비 4,400원, 배송비는 무료입니다.',
        subComent:
          '입금시 배송되며 우리은행 1002-902-564862  스마텔 (입금자명 명의자성함)',
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
];
const inputsInitial = {
  usimNumber: '',
  usimType: '',
  esimFactory: '',
  modelName: '',
  modelVolume: '',
  serialNumber: '',
  imei1: '',
  imei2: '',
  EID: '',
  USIM_PAY_TYPE: '구매',
};
const S4Usim = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState(inputsInitial);
  const handleInputChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [picAttOpen, setPicAttOpen] = useState(false);
  const [uploadImg, setUploadImg] = useState<File>();

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const closeModal2 = () => {
    setPicAttOpen(false);
  };
  return (
    <Main>
      <div className="w-full p-5 sm:px-0">
        <h2 className="flex justify-center py-10 text-4xl font-bold">
          유심 주문 옵션을 선택해주세요
        </h2>
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {usimTypes.map((usimType) => (
              <Tab
                key={usimType.title}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg p-2 font-medium leading-5 text-blue-700',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
                onClick={() => {
                  let USIM_PAY_TYPE = '';
                  if (usimType.title === '유심 보유') {
                    USIM_PAY_TYPE = '구매';
                  } else if (usimType.title === '유심 없음') {
                    USIM_PAY_TYPE = '유심 택배요청 - 일반 유심';
                  } else {
                    USIM_PAY_TYPE = 'esim';
                  }
                  setInputs({
                    ...inputsInitial,
                    usimType: usimType.title,
                    USIM_PAY_TYPE,
                  });
                }}
              >
                <h2 className={'mb-2 text-xl font-bold md:text-2xl'}>
                  {usimType.title}
                </h2>
                <h3 className={'mb-2 text-xs'}>{usimType.subTitle}</h3>
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
                src={`${router.basePath}/assets/images/usimnumber.jpg`}
                alt={'이미지'}
              />
              <div className="border-4 mb-3">
                <input
                  type="text"
                  name="usimNumber"
                  id="usimNumber"
                  value={inputs.usimNumber}
                  onChange={handleInputChange}
                  placeholder={'USIM 번호'}
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-3"
                />
              </div>
              <button
                className="rounded-md border p-3"
                onClick={() => {
                  setPicAttOpen(true);
                }}
              >
                usim 사진 첨부하기
              </button>
              <Modal
                isOpen={picAttOpen}
                ariaHideApp={false}
                style={customStyles}
              >
                <>
                  <input
                    type="file"
                    name="imageFile"
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      const files = target?.files || [];
                      setUploadImg(files[0]);
                    }}
                  />
                  <div className="flex space-x-1 mt-3">
                    <button onClick={closeModal2} className="p-3 border">
                      취소
                    </button>
                    <button
                      type="submit"
                      onClick={() => {
                        saveImage(uploadImg);
                      }}
                      className="p-3 border"
                    >
                      저장
                    </button>
                  </div>
                </>
              </Modal>
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
                    <p>{item.coment}</p>
                    <p>{item.subComent}</p>
                    <RadioGroup.Option
                      value={item}
                      onClick={() => {
                        let USIM_PAY_TYPE = '';
                        if (item.name === '일반 유심') {
                          USIM_PAY_TYPE = '유심 택배요청 - 일반 유심';
                        } else {
                          USIM_PAY_TYPE = '유심 택배요청 - nfc 유심';
                        }
                        setInputs({
                          ...inputs,
                          usimType: item.name,
                          USIM_PAY_TYPE,
                        });
                      }}
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
                      <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
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
                                    onClick={() => {
                                      setInputs({
                                        ...inputs,
                                        esimFactory: factory,
                                      });
                                    }}
                                    className={({ active, checked }) =>
                                      `${
                                        active
                                          ? 'ring-2 ring-[#b52323]'
                                          : 'ring-2 ring-[#140f0f]'
                                      }
                  ${
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative text-center flex w-1/3 cursor-pointer rounded-lg px-4 shadow-md focus:outline-none`
                                    }
                                  >
                                    {({ checked }) => (
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
                    <div className="bg-gray-50 p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        단말 정보
                      </dt>
                      <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="modelName"
                                className="block font-medium text-gray-700"
                              >
                                모델명
                              </label>
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="modelName"
                                id="modelName"
                                value={inputs.modelName}
                                onChange={handleInputChange}
                                className="block w-full p-3 rounded-md border border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="modelVolume"
                                className="block text-sm font-medium text-gray-700"
                              >
                                모델용량
                              </label>
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="modelVolume"
                                id="modelVolume"
                                value={inputs.modelVolume}
                                onChange={handleInputChange}
                                className="block w-full p-3 rounded-md border border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="serialNumber"
                                className="block text-sm font-medium text-gray-700"
                              >
                                일련번호
                              </label>
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="serialNumber"
                                id="serialNumber"
                                value={inputs.serialNumber}
                                onChange={handleInputChange}
                                className="block w-full p-3 rounded-md border border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                        </dl>
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">
                        <button
                          type="button"
                          onClick={openModal}
                          className="rounded-md px-4 py-2 text-sm font-medium text-blue-900 border border-gray-300 shadow-sm focus:outline-none"
                        >
                          단말 정보 보는 방법
                        </button>
                      </dt>
                      <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="imei1"
                                className="block font-medium text-gray-700"
                              >
                                imei1(15자리)
                              </label>
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="imei1"
                                id="imei1"
                                value={inputs.imei1}
                                onChange={handleInputChange}
                                className="block w-full p-3 rounded-md border border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                        </dl>
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="imei2"
                                className="block font-medium text-gray-700"
                              >
                                imei2(15자리)
                              </label>
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="imei2"
                                id="imei2"
                                value={inputs.imei2}
                                onChange={handleInputChange}
                                className="block w-full p-3 rounded-md border border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                        </dl>
                        <dl>
                          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">
                              <label
                                htmlFor="EID"
                                className="block font-medium text-gray-700"
                              >
                                EID(32자리)
                              </label>
                            </dt>
                            <dd className="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <input
                                type="text"
                                name="EID"
                                id="EID"
                                value={inputs.EID}
                                onChange={handleInputChange}
                                className="block p-3 w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                              />
                            </dd>
                          </div>
                        </dl>
                      </dd>
                      <Modal isOpen={modalOpen} ariaHideApp={false}>
                        <img
                          src={`${router.basePath}/assets/images/202208_model_info.png`}
                          alt={'단말정보 보는일'}
                          onClick={closeModal}
                        />
                        <button
                          onClick={closeModal}
                          className="w-full p-3 border border-gray-300 shadow-sm focus:outline-none mt-5"
                        >
                          닫기
                        </button>
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
          const v1 = inputs.imei1.length !== 15;
          const v2 = inputs.imei2.length !== 15;
          const v3 = inputs.EID.length !== 32;
          if (inputs.usimType === 'eSim 사용') {
            if (v1) {
              alert('imei1 15자리를 입력해주세요');
            } else if (v2) {
              alert('imei2 15자리를 입력해주세요');
            } else if (v3) {
              alert('EID 32자리를 입력해주세요');
            } else {
              sessionStorage.setItem('S4Usim', JSON.stringify(inputs));
              router.push('./S5Identification');
            }
          } else {
            sessionStorage.setItem('S4Usim', JSON.stringify(inputs));
            router.push('./S5Identification');
          }
        }}
        className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
      >
        다음
      </button>
    </Main>
  );
};

export default S4Usim;
