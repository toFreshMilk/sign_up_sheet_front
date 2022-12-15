import { RadioGroup } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

import { Main } from '@/templates/Main';
import CheckIcon from '@/utils/Commons';

const payFeeMethodTypes = [
  { title: '계좌이체', checked: true },
  { title: '체크/신용카드 납부', checked: false },
];

const bankList = [
  { title: '국민', disabled: false },
  { title: '기업', disabled: false },
  { title: '신한', disabled: false },
  { title: '우체국', disabled: true },
];
const cardList = [
  { title: '카드1', disabled: false },
  { title: '카드2', disabled: false },
  { title: '카드3', disabled: false },
  { title: '카드4', disabled: true },
];
const relationList = [
  { title: '본인', disabled: false },
  { title: '부모', disabled: false },
  { title: '자녀', disabled: false },
  { title: '배우자', disabled: true },
];

const S11PayFeeMethod = () => {
  const router = useRouter();
  const [payFeeMethodType, setPayFeeMethodType] = useState(
    payFeeMethodTypes[0]
  );
  const [bank, setBank] = useState(bankList[0]?.title);
  const [card, setCard] = useState(cardList[0]?.title);
  const [relation, setRelation] = useState(relationList[0]?.title);

  const [userInfo, setUserInfo] = useState({
    accountNumber: '',
    accountName: '',
    accountJumin1: '',
    accountJumin2: '',
    cardOwnerName: '',
    cardNumber1: '',
    cardNumber2: '',
    cardNumber3: '',
    cardNumber4: '',
    validTimeMonth: '',
    validTimeYear: '',
    cardPasswordDigit2: '',
  });
  const handleInputChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center py-10 text-3xl font-bold">
          요금 납부 방법을 선택해주세요
        </h2>
        <div className="col-span-6 mt-5 sm:col-span-4 mb-3">
          <label
            className="block text-sm font-medium text-gray-700"
            onClick={() => {
              console.log(payFeeMethodType);
            }}
          >
            납부 방법
          </label>
          <RadioGroup value={payFeeMethodType} onChange={setPayFeeMethodType}>
            <div className="grid grid-cols-2 mt-3">
              {payFeeMethodTypes.map((item) => (
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
        {payFeeMethodType?.title === '계좌이체' ? (
          <>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="methodType"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                계좌 정보
              </label>
              <select
                name="methodType"
                value={bank}
                onChange={(e) => {
                  setBank(e.target.value);
                }}
                className="p-4 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none sm:text-sm"
              >
                {bankList.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="accountNumber"
                onChange={handleInputChange}
                value={userInfo.accountNumber}
                className="p-3 block w-full rounded-md border border-gray-300 shadow-sm mt-2"
              />
              <p>* 평생계좌(휴대폰번호 형식 계좌)의 경우 등록이 불가합니다.</p>
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="accountName"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                예금주명
              </label>
              <input
                type="text"
                name="accountName"
                onChange={handleInputChange}
                value={userInfo.accountName}
                className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="accountJumin"
                className="flex flex-row w-full text-sm font-medium text-gray-700 mb-3"
              >
                예금주 주민등록번호
              </label>
              <div className="flex w-full mb-3">
                <input
                  type="text"
                  name="accountJumin1"
                  onChange={handleInputChange}
                  value={userInfo.accountJumin1}
                  className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="accountJumin2"
                  onChange={handleInputChange}
                  value={userInfo.accountJumin2}
                  className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="methodType"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                관계
              </label>
              <select
                name="methodType"
                value={relation}
                onChange={(e) => {
                  setRelation(e.target.value);
                }}
                className="p-4 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none sm:text-sm"
              >
                {relationList.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="methodType"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                카드명
              </label>
              <select
                name="methodType"
                value={card}
                onChange={(e) => {
                  setCard(e.target.value);
                }}
                className="p-4 block w-full rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none sm:text-sm mb-3"
              >
                {cardList.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <div className="flex">
                <input
                  type="text"
                  name="cardNumber1"
                  onChange={handleInputChange}
                  value={userInfo.cardNumber1}
                  className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="cardNumber2"
                  onChange={handleInputChange}
                  value={userInfo.cardNumber2}
                  className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="cardNumber3"
                  onChange={handleInputChange}
                  value={userInfo.cardNumber3}
                  className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="cardNumber4"
                  onChange={handleInputChange}
                  value={userInfo.cardNumber4}
                  className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="validTime"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                유효기간
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="validTimeMonth"
                  onChange={handleInputChange}
                  value={userInfo.validTimeMonth}
                  className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                />
                <span className="p-3">/</span>
                <input
                  type="text"
                  name="validTimeYear"
                  onChange={handleInputChange}
                  value={userInfo.validTimeYear}
                  className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="validTime"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                비밀번호 앞 2자리
              </label>
              <input
                type="text"
                name="cardPasswordDigit2"
                onChange={handleInputChange}
                value={userInfo.cardPasswordDigit2}
                className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
          </>
        )}
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            sessionStorage.setItem(
              'S11PayFeeMethod',
              JSON.stringify({
                ...userInfo,
                payFeeMethodType,
                bank,
                card,
                relation,
              })
            );
            router.push('./S12JoinResult');
          }}
          className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S11PayFeeMethod;
