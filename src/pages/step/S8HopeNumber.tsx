import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';

const S8HopeNumber = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    hope1: '',
    hope2: '',
  });
  const handleInputChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center py-10 text-3xl font-bold p-3">
          새롭게 사용할 전화번호의 희망하는 뒷자리를 입력해주세요
        </h2>
        <div className="col-span-6 sm:col-span-4 mt-5">
          <label
            htmlFor="hope1"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            1순위
          </label>
          <input
            type="text"
            name="hope1"
            onChange={handleInputChange}
            value={userInfo.hope1}
            className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div className="col-span-6 sm:col-span-4 mt-5">
          <label
            htmlFor="hope2"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            2순위
          </label>
          <input
            type="text"
            name="hope2"
            onChange={handleInputChange}
            value={userInfo.hope2}
            className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <p>* 1, 2순위 모두 불가시, 임의 선택됩니다.</p>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            sessionStorage.setItem(
              'S8HopeNumber',
              JSON.stringify({
                ...userInfo,
              })
            );
            router.push('./S9ContactableNumber');
          }}
          className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S8HopeNumber;
