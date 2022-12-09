import { RadioGroup } from '@headlessui/react';
import axios from 'axios';
import moment from 'moment';
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

  const [keys, setKeys] = useState({
    mid: '',
    apiKey: '',
    mTxId: '',
    authHash: '',
    reqSvcCd: '01',
    userHash: '',
  });

  const [person, setPerson] = useState({
    userName: process.env.NEXT_PUBLIC_NAME || '',
    userPhone: process.env.NEXT_PUBLIC_PHONE || '',
    userBirth: process.env.NEXT_PUBLIC_BIRTH || '',
    email1: '',
    email2: '',
    publishedDate1: '',
    driverLicenseNumber1: '',
    driverLicenseNumber2: '',
    driverLicenseNumber3: '',
    driverLicenseNumber4: '',
  });

  const handleInputChange = (e: any) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    async function getKeys() {
      try {
        const getKeyUrl = `${process.env.NEXT_PUBLIC_API_URL}/getKeys`;
        const { data } = await axios.post(getKeyUrl);
        const mtxId = `smar${moment().format('YYMMDDHHmmssms')}`;
        setKeys({
          ...data,
          mTxId: mtxId,
        });
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
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700"
              >
                이름
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                className="p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                onChange={handleInputChange}
                value={person.userName}
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="userPhone"
                className="block text-sm font-medium text-gray-700"
              >
                핸드폰 번호
              </label>
              <input
                type="text"
                name="userPhone"
                id="userPhone"
                className="p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                onChange={handleInputChange}
                value={person.userPhone}
              />
            </div>
            <div className="col-span-12 sm:col-span-3">
              <label
                htmlFor="userBirth"
                className="block text-sm font-medium text-gray-700"
              >
                8자리 생년월일
              </label>
              <input
                type="text"
                name="userBirth"
                id="userBirth"
                className="p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                onChange={handleInputChange}
                value={person.userBirth}
              />
            </div>
            <div className="col-span-6 sm:col-span-3" />
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email1"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                type="text"
                name="email1"
                id="email1"
                className="p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                onChange={handleInputChange}
                value={person.email1}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email2"
                className="block text-sm font-medium text-gray-700"
              >
                @ 직접 입력
              </label>
              <input
                type="text"
                name="email2"
                id="email2"
                className="ml-2 p-3 w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                onChange={handleInputChange}
                value={person.email2}
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
                <div className="mb-5 grid grid-cols-2 sm:mt-8">
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
                    className="block text-sm font-medium text-gray-700 mb-5"
                  >
                    발급일자
                  </label>
                  <input
                    type="text"
                    name="publishedDate1"
                    onChange={handleInputChange}
                    value={person.publishedDate1}
                    className="p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm mb-5"
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
                      className="block text-sm font-medium text-gray-700 mb-5"
                    >
                      운전면허 번호
                    </label>
                    <div className="mb-5">
                      <select
                        name="driverLicenseNumber1"
                        className="p-3 w-1/5 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none sm:text-sm mb-5"
                        onChange={handleInputChange}
                        value={person.driverLicenseNumber1}
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                      <span className="p-3">-</span>
                      <input
                        type="text"
                        name="driverLicenseNumber2"
                        onChange={handleInputChange}
                        value={person.driverLicenseNumber2}
                        className="p-3 w-1/5 rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                      <span className="p-3">-</span>
                      <input
                        type="text"
                        name="driverLicenseNumber3"
                        onChange={handleInputChange}
                        value={person.driverLicenseNumber3}
                        className="p-3 w-1/5 rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                      <span className="p-3">-</span>
                      <input
                        type="text"
                        name="driverLicenseNumber4"
                        onChange={handleInputChange}
                        value={person.driverLicenseNumber4}
                        className="p-3 w-1/5 rounded-md border-gray-300 shadow-sm sm:text-sm"
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
                      className="p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
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
              <S5Identification2 k={{ ...keys, ...person }} />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <button
            onClick={async () => {
              const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/checkIdentification`;
              const passedIdentification = await axios.post(tokenUrl, {
                mTxId: keys.mTxId,
              });

              if (passedIdentification.data.length === 0) {
                alert('본인인증이 되지 않았습니다.');
                sessionStorage.setItem(
                  'S5Identification',
                  JSON.stringify({ ...person, identification })
                );
                await router.push('./S6UsingPhoneNumber');
              } else {
                sessionStorage.setItem(
                  'S5Identification',
                  JSON.stringify({ ...person, identification })
                );
                await router.push('./S6UsingPhoneNumber');
              }
            }}
            className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
          >
            다음
          </button>
        </div>
      </div>
    </Main>
  );
};

export default S5Identification;
