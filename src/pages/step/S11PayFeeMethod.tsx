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

  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center py-10 text-3xl font-bold">
          요금 납부 방법을 선택해주세요
        </h2>
        <div className="col-span-6 mt-5 sm:col-span-4">
          <label
            className="block text-sm font-medium text-gray-700"
            onClick={() => {
              console.log(payFeeMethodType);
            }}
          >
            납부 방법
          </label>
          <RadioGroup value={payFeeMethodType} onChange={setPayFeeMethodType}>
            <div className="mt-5 grid grid-cols-2 sm:mt-8">
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
                className="block text-sm font-medium text-gray-700"
              >
                계좌 정보
              </label>
              <select
                name="methodType"
                value={bank}
                onChange={(e) => {
                  setBank(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
              >
                {bankList.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="bankNumber"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              <p>* 평생계좌(휴대폰번호 형식 계좌)의 경우 등록이 불가합니다.</p>
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                예금주명
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                예금주 주민등록번호
              </label>
              <input
                type="text"
                name="jumin1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              <input
                type="text"
                name="jumin2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="methodType"
                className="block text-sm font-medium text-gray-700"
              >
                관계
              </label>
              <select
                name="methodType"
                value={relation}
                onChange={(e) => {
                  setRelation(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
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
                className="block text-sm font-medium text-gray-700"
              >
                카드번호
              </label>
              <select
                name="methodType"
                value={card}
                onChange={(e) => {
                  setCard(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none sm:text-sm"
              >
                {cardList.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="cardNumber"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="validTime"
                className="block text-sm font-medium text-gray-700"
              >
                유효기간
              </label>
              <input
                type="text"
                name="validTimeMonth"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              <input
                type="text"
                name="validTimeYear"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="validTime"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호 앞 2자리
              </label>
              <input
                type="text"
                name="password1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
              <input
                type="text"
                name="password2"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
          </>
        )}
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            router.push('./S12JoinResult');
          }}
          className="w-full rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S11PayFeeMethod;
