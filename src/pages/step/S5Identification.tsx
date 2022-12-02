import { RadioGroup } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import S5Identification2 from '@/pages/step/S5Identification2';
import { Main } from '@/templates/Main';
import CheckIcon from '@/utils/Commons';

axios.defaults.withCredentials = true;

const identificationTypes = [
  { title: '주민등록증', checked: true },
  { title: '운전면허증', checked: false },
];

const S5Identification = () => {
  const router = useRouter();
  const [identification, setIdentification] = useState(identificationTypes[0]);

  const [keys, setKeys] = useState({ mid: '', apiKey: '', hashingKey: '' });
  // const [authHash, setAuthHash] = useState('');
  // const [authHash, setAuthHash] = useState('');
  // const [userHash, setUserHash] = useState('');
  useEffect(() => {
    async function getKeys() {
      try {
        const getKeyUrl = `${process.env.NEXT_PUBLIC_API_URL}/getKeys`;
        const { data } = await axios.post(getKeyUrl);
        setKeys(data);
      } catch (e) {
        console.log('getKeys e');
        console.log(e);
      }
    }
    getKeys();
  }, []);

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
                <div className="mt-5 grid grid-cols-2 sm:mt-8">
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

              {identification?.title === '주민등록증' ? (
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="publishedDate1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    발급일자
                  </label>
                  <input
                    type="text"
                    name="publishedDate1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  />
                  <img
                    src={`${router.basePath}/assets/images/registration_card.png`}
                    alt={'주민증'}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="driverLicenseNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      운전면허 번호
                    </label>
                    <div>
                      <select
                        name="driverLicenseNumber"
                        className="mt-1 w-1/5 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <span>-</span>
                      <input
                        type="text"
                        name="driverLicenseNumber"
                        className="mt-1 w-1/5 rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                      <span>-</span>
                      <input
                        type="text"
                        name="driverLicenseNumber"
                        className="mt-1 w-1/5 rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                      <span>-</span>
                      <input
                        type="text"
                        name="driverLicenseNumber"
                        className="mt-1 w-1/5 rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="publishedDate2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      발급일자
                    </label>
                    <input
                      type="text"
                      name="publishedDate2"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                  </div>
                  <img
                    src={`${router.basePath}/assets/images/drivers_license.png`}
                    alt={'면허증'}
                  />
                </>
              )}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <S5Identification2 k={keys} />
              <p
                onClick={async () => {
                  const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/insertNewRow`;
                  const aaaa = await axios.post(tokenUrl);
                  console.log(aaaa);
                }}
              >
                insertNewRow
              </p>
              <p>여기에 이니시스 인증</p>
              <p>여기에 이니시스 인증</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <button
            onClick={() => {
              router.push('./S6UsingPhoneNumber');
            }}
            className="w-full rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            본인인증 완료
          </button>
        </div>
      </div>
    </Main>
  );
};

export default S5Identification;
