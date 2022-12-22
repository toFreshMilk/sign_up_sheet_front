import { RadioGroup } from '@headlessui/react';
import { Fragment, useEffect } from 'react';

import CheckIcon from '@/utils/Commons';
import driverLicenceRegion from '@/utils/PublicData';

const S5normal = () => {
  useEffect(() => {
    console.log(process.env.hi);
  }, []);
  return (
    <>
      <label
        className="mb-3 block text-sm font-medium text-gray-700"
        onClick={() => {
          console.log(identification);
        }}
      >
        신분증 정보
      </label>
      <RadioGroup
        value={identification}
        onChange={setIdentification}
      >
        <div className="mb-5 grid grid-cols-2">
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
      <div className="col-span-6 sm:col-span-4">
        <label
          htmlFor="driverLicenseNumber"
          className="mb-5 block text-sm font-medium text-gray-700"
        >
          주민등록번호
        </label>
        <div className="mb-5 flex">
          <input
            type="text"
            name="jumin1"
            onChange={handleInputChange}
            value={person.jumin1}
            className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
          />
          <span className="p-3">-</span>
          <input
            type="text"
            name="jumin2"
            onChange={handleInputChange}
            value={person.jumin2}
            className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
          />
        </div>
      </div>

      {identification?.title === '주민등록증' ? (
        <div className="col-span-6 sm:col-span-4">
          <img
            src={`${router.basePath}/assets/images/registration_card.png`}
            alt={'주민증'}
          />
        </div>
      ) : (
        <>
          <label
            htmlFor="driverLicenseNumber"
            className="mb-5 block text-sm font-medium text-gray-700"
          >
            운전면허 번호
          </label>
          <div className="mb-5 flex">
            <select
              name="driverLicenseNumber1"
              className="w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:outline-none sm:text-sm"
              onChange={handleInputChange}
              value={person.driverLicenseNumber1}
            >
              {driverLicenceRegion.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <span className="p-3">-</span>
            <input
              type="text"
              name="driverLicenseNumber2"
              onChange={handleInputChange}
              value={person.driverLicenseNumber2}
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
            />
            <span className="p-3">-</span>
            <input
              type="text"
              name="driverLicenseNumber3"
              onChange={handleInputChange}
              value={person.driverLicenseNumber3}
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
            />
            <span className="p-3">-</span>
            <input
              type="text"
              name="driverLicenseNumber4"
              onChange={handleInputChange}
              value={person.driverLicenseNumber4}
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
            />
          </div>
          <img
            src={`${router.basePath}/assets/images/drivers_license.png`}
            alt={'면허증'}
          />
        </>
      )}
    </>
  );
};

export default S5normal;
