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
  const [telecom, setTelecom] = useState(telecomList[0]?.title);
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
          <label
            htmlFor="selectedTelecom"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            통신사 선택
          </label>
          <select
            name="selectedTelecom"
            value={telecom}
            onChange={(e) => {
              setTelecom(e.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:outline-none sm:text-sm"
          >
            {telecomList.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-6 sm:col-span-4 mt-5">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            휴대폰 번호
          </label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleInputChange}
            value={userInfo.phoneNumber}
            className="block p-3 w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
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
            const S3JoinType = sessionStorage.getItem('S3JoinType') || '';
            const S3JoinTypeJson = JSON.parse(S3JoinType);
            if (S3JoinTypeJson.joinType === '신규가입') {
              router.push('./S8HopeNumber');
            } else {
              router.push('./S7PayFeeMethod');
            }
          }}
          className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S6UsingPhoneNumber;
