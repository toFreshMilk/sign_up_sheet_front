import { RadioGroup } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import { Main } from '@/templates/Main';
import { CheckIcon } from '@/utils/Commons';

const chungGuTypes = [
  { title: 'e-mail 명세서', checked: true },
  { title: '문자', checked: false },
];

const S10InputAddress = () => {
  const router = useRouter();

  const [openPostcode, setOpenPostcode] = useState(false);
  const [chungGuType, setChungGuType] = useState(chungGuTypes[0]);
  const [userInfo, setUserInfo] = useState({
    receiveName: '',
    receivePhoneNumber: '',
    receiveAddress1: '',
    receiveAddress2: '',
    receiveMethod: '',
    zipcode: '',
  });
  const handleInputChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center p-3 py-10 text-3xl font-bold">
          유심 및 요금 청구서를 받으실 주소를 입력해주세요
        </h2>
        <div className="col-span-6 mt-5 sm:col-span-4">
          <label
            htmlFor="receiveName"
            className="mb-3 block text-sm font-medium text-gray-700"
          >
            수령인
          </label>
          <input
            type="text"
            name="receiveName"
            onChange={handleInputChange}
            value={userInfo.receiveName}
            className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
          />
        </div>
        <div className="col-span-6 mt-5 sm:col-span-4">
          <label
            htmlFor="receivePhoneNumber"
            className="mb-3 block text-sm font-medium text-gray-700"
          >
            수령인 휴대폰 번호
          </label>
          <input
            type="text"
            name="receivePhoneNumber"
            onChange={handleInputChange}
            value={userInfo.receivePhoneNumber}
            className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
          />
        </div>
        <div className="col-span-6 mt-5 sm:col-span-4">
          <button
            className="rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
            onClick={() => {
              setOpenPostcode(!openPostcode);
            }}
          >
            주소 검색
          </button>
          {openPostcode && (
            <DaumPostcode
              onComplete={(data) => {
                setUserInfo({
                  ...userInfo,
                  receiveAddress1: data.roadAddress,
                  zipcode: data.zonecode,
                });
                setOpenPostcode(false);
              }}
              autoClose={false}
              defaultQuery="판교역로 235"
            />
          )}
        </div>
        <div className="col-span-6 mt-5 sm:col-span-4">
          <input
            type="text"
            name="receiveAddress1"
            readOnly={true}
            className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
            onChange={handleInputChange}
            value={userInfo.receiveAddress1}
          />
        </div>
        <div className="col-span-6 mt-5 sm:col-span-4">
          <input
            type="text"
            name="receiveAddress2"
            className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
            onChange={handleInputChange}
            value={userInfo.receiveAddress2}
          />
        </div>
        <div className="col-span-6 mt-5 sm:col-span-4">
          <label className="block text-sm font-medium text-gray-700">
            청구서 수령방법
          </label>
          <RadioGroup value={chungGuType} onChange={setChungGuType}>
            <div className="mt-3 grid grid-cols-2 sm:mt-8">
              {chungGuTypes.map((item) => (
                <RadioGroup.Option key={item.title} value={item} as={Fragment}>
                  {({ checked }) => (
                    <button className="rounded-md border px-8 py-3 text-base font-medium md:py-4 md:px-10 md:text-lg">
                      <div className="flex items-center">
                        {checked && (
                          <div className="mr-2 shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                        {item.title}
                      </div>
                    </button>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            sessionStorage.setItem(
              'S10InputAddress',
              JSON.stringify({
                ...userInfo,
                chungGuType,
              })
            );
            router.push('./S11PayFeeMethod');
          }}
          className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S10InputAddress;
