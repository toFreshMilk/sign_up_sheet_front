import { useRouter } from 'next/router';

import { Main } from '@/templates/Main';

const S8HopeNumber = () => {
  const router = useRouter();
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center py-10 text-4xl font-bold">
          새롭게 사용할 전화번호의 희망하는 뒷자리를 입력해주세요
        </h2>
        <div className="col-span-6 sm:col-span-4 mt-5">
          <label
            htmlFor="tier1"
            className="block text-sm font-medium text-gray-700"
          >
            1순위
          </label>
          <input
            type="text"
            name="tier1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div className="col-span-6 sm:col-span-4 mt-5">
          <label
            htmlFor="tier2"
            className="block text-sm font-medium text-gray-700"
          >
            2순위
          </label>
          <input
            type="text"
            name="tier2"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            router.push('./S9ContactableNumber');
          }}
          className="w-full rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S8HopeNumber;
