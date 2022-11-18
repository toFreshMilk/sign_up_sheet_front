import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';

const payMethodList = [
  { title: '신용카드', disabled: false },
  { title: '은행계좌번호', disabled: false },
  { title: '휴대폰일련번호', disabled: false },
  { title: '지로납부', disabled: true },
];

const S7PayFeeMethod = () => {
  const router = useRouter();
  const [payMethod, setPayMethod] = useState(payMethodList[0]?.title);

  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center py-10 text-4xl font-bold">
          현재 요금 납부 방법을 알려주세요
        </h2>
        <div className="col-span-6 sm:col-span-4">
          <label
            htmlFor="methodType"
            className="block text-sm font-medium text-gray-700"
          >
            요금 납부 유형
          </label>
          <select
            name="methodType"
            value={payMethod}
            onChange={(e) => {
              setPayMethod(e.target.value);
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
          >
            {payMethodList.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-6 sm:col-span-4 mt-5">
          {payMethod === '지로납부' ? (
            <p>별도 입력하실 정보가 없습니다.</p>
          ) : (
            <>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                뒤 4자리 입력
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            router.push('./S8HopeNumber');
          }}
          className="w-full rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S7PayFeeMethod;