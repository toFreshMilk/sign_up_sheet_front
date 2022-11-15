import { RadioGroup } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

import { Main } from '@/templates/Main';

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
const identificationTypes = [
  { title: '주민등록증', checked: true },
  { title: '운전면허증', checked: false },
];
const S5Identification = () => {
  const router = useRouter();
  const [identification, setIdentification] = useState(identificationTypes[0]);

  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                이름
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="jumin1"
                className="block text-sm font-medium text-gray-700"
              >
                주민번호 앞자리
              </label>
              <input
                type="text"
                name="jumin1"
                id="jumin1"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="jumin2"
                className="block text-sm font-medium text-gray-700"
              >
                주민번호 뒷자리
              </label>
              <input
                type="text"
                name="jumin2"
                id="jumin2"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="jumin1"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                type="text"
                name="jumin1"
                id="jumin1"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="jumin2"
                className="block text-sm font-medium text-gray-700"
              >
                @ 직접 입력
              </label>
              <input
                type="text"
                name="jumin2"
                id="jumin2"
                className="focus:border-indigo-500 focus:ring-indigo-500 ml-2 mt-1 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label
                className="block text-sm font-medium text-gray-700"
                onClick={() => {
                  console.log(identification);
                }}
              >
                신분증 정보
              </label>
              <RadioGroup value={identification} onChange={setIdentification}>
                <div className="grid grid-cols-2 mt-5 sm:mt-8">
                  {identificationTypes.map((item) => (
                    <RadioGroup.Option
                      key={item.title}
                      value={item}
                      as={Fragment}
                    >
                      {({ checked }) => (
                        <button className="rounded-md border px-8 py-3 text-base font-medium md:py-4 md:px-10 md:text-lg">
                          <div className="flex items-center">
                            {checked && (
                              <div className="shrink-0 text-white mr-2">
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

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium text-gray-700"
              >
                Street address
              </label>
              <input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="address-level2"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                State / Province
              </label>
              <input
                type="text"
                name="region"
                id="region"
                autoComplete="address-level1"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP / Postal code
              </label>
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="border-transparent bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 inline-flex justify-center rounded-md border py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </Main>
  );
};

export default S5Identification;
