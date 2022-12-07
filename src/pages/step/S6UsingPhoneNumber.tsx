import { Listbox } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';

const telecomList = [
  { title: 'SKT', checked: true },
  { title: 'KT', checked: false },
  { title: 'LGT', checked: false },
  { title: 'SKT(알뜰폰)', checked: false },
  { title: 'KT(알뜰폰)', checked: false },
  { title: 'LGT(알뜰폰)', checked: false },
];
const S6UsingPhoneNumber = () => {
  const router = useRouter();
  const [telecom, setTelecom] = useState(telecomList[0]);
  const [userInfo, setUserInfo] = useState({
    phoneNumber: '',
  });

  const handleInputChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center py-10 text-3xl font-bold">
          현재 이용중인 휴대폰 번호를 입력해주세요
        </h2>
        <div className="col-span-6 sm:col-span-4">
          <Listbox value={telecom} onChange={setTelecom}>
            <Listbox.Button>통신사</Listbox.Button>
            <Listbox.Options>
              {telecomList.map((item) => (
                <Listbox.Option key={item.title} value={item}>
                  {item.title}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <div className="col-span-6 sm:col-span-4 mt-5">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            휴대폰 번호
          </label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleInputChange}
            value={userInfo.phoneNumber}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            sessionStorage.setItem(
              'S6UsingPhoneNumber',
              JSON.stringify({
                ...userInfo,
                telecom,
              })
            );

            router.push('./S7PayFeeMethod');
          }}
          className="w-full rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S6UsingPhoneNumber;
