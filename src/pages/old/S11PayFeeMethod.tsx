import { RadioGroup } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

import { Main } from '@/templates/Main';
import { CheckIcon } from '@/utils/Commons';
import { bankList, cardList } from '@/utils/PublicData';

const payFeeMethodTypes = [
  { title: '계좌이체', checked: true },
  { title: '체크/신용카드 납부', checked: false },
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
  const [bank, setBank] = useState(bankList[0]?.name);
  const [bankCd, setBankCd] = useState(bankList[0]?.value);
  const [card, setCard] = useState(cardList[0]?.title);
  const [relation, setRelation] = useState(relationList[0]?.title);
  const [checkAccountInfo, setCheckAccountInfo] = useState(false);

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
  const checkAccountInfoFunc = async () => {
    const checkUrl = `${process.env.NEXT_PUBLIC_API_URL}/checkAccountInfoFunc`;
    const result = await axios.post(checkUrl, {
      accountName: userInfo.accountName,
      accountJumin1: userInfo.accountJumin1,
      bankCd,
      accountNumber: userInfo.accountNumber,
      acctGb: '1',
    });
    console.log(result);
    console.log(result.data.dataHeader.GW_RSLT_CD);
    if (result.data.dataHeader.GW_RSLT_CD === '1200') {
      setCheckAccountInfo(true);
    } else {
      // eslint-disable-next-line no-alert
      alert('계좌 확인이 되지 않았습니다.');
    }
  };
  const next = () => {
    sessionStorage.setItem(
      'S11PayFeeMethod',
      JSON.stringify({
        ...userInfo,
        payFeeMethodType,
        bank,
        card,
        relation,
        accountJuminTotal: userInfo.accountJumin1 + userInfo.accountJumin2,
        cardNumberTotal:
          userInfo.cardNumber1 +
          userInfo.cardNumber2 +
          userInfo.cardNumber3 +
          userInfo.cardNumber4,
      })
    );
    router.push('./S12JoinResult');
  };
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center p-3 py-10 text-3xl font-bold">
          요금 납부 방법을 선택해주세요
        </h2>
        <div className="col-span-6 mt-5 mb-3 sm:col-span-4">
          <label
            className="block text-sm font-medium text-gray-700"
            onClick={() => {
              console.log(payFeeMethodType);
            }}
          >
            납부 방법
          </label>
          <RadioGroup value={payFeeMethodType} onChange={setPayFeeMethodType}>
            <div className="mt-3 grid grid-cols-2">
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
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                계좌 정보
              </label>
              <select
                name="methodType"
                onChange={(e) => {
                  const b = bankList.find((o) => o.value === e.target.value);
                  setBank(b?.name);
                  setBankCd(e.target.value);
                }}
                className="block w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm focus:outline-none sm:text-sm"
              >
                {bankList.map((item) => (
                  <option key={item.name} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="accountNumber"
                onChange={handleInputChange}
                value={userInfo.accountNumber}
                className="mt-2 block w-full rounded-md border border-gray-300 p-3 shadow-sm"
              />
              <p>* 평생계좌(휴대폰번호 형식 계좌)의 경우 등록이 불가합니다.</p>
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="accountName"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                예금주명
              </label>
              <input
                type="text"
                name="accountName"
                onChange={handleInputChange}
                value={userInfo.accountName}
                className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="accountJumin"
                className="mb-3 flex w-full flex-row text-sm font-medium text-gray-700"
              >
                소유자 주민등록번호
              </label>
              <div className="mb-3 flex w-full">
                <input
                  type="text"
                  name="accountJumin1"
                  maxLength={6}
                  onChange={handleInputChange}
                  value={userInfo.accountJumin1}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="accountJumin2"
                  maxLength={7}
                  onChange={handleInputChange}
                  value={userInfo.accountJumin2}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
              </div>
              <button
                className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                onClick={() => {
                  checkAccountInfoFunc();
                }}
              >
                <div className="flex justify-center">
                  {checkAccountInfo && <CheckIcon className="h-6 w-6" />}
                  <span className="ml-3">예금주, 주민번호, 계좌 확인</span>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-6 mt-5 mb-3 sm:col-span-4">
              <label
                htmlFor="cardOwnerName"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                카드 소유주 이름
              </label>
              <input
                type="text"
                name="cardOwnerName"
                onChange={handleInputChange}
                value={userInfo.cardOwnerName}
                className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="methodType"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                카드명
              </label>
              <select
                name="methodType"
                value={card}
                onChange={(e) => {
                  setCard(e.target.value);
                }}
                className="mb-3 block w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm focus:outline-none sm:text-sm"
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
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="cardNumber2"
                  onChange={handleInputChange}
                  value={userInfo.cardNumber2}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="cardNumber3"
                  onChange={handleInputChange}
                  value={userInfo.cardNumber3}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="cardNumber4"
                  onChange={handleInputChange}
                  value={userInfo.cardNumber4}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="validTime"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                유효기간
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="validTimeMonth"
                  maxLength={2}
                  onChange={handleInputChange}
                  value={userInfo.validTimeMonth}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">/</span>
                <input
                  type="text"
                  name="validTimeYear"
                  maxLength={2}
                  onChange={handleInputChange}
                  value={userInfo.validTimeYear}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
              </div>
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="validTime"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                비밀번호 앞 2자리
              </label>
              <input
                type="text"
                name="cardPasswordDigit2"
                maxLength={2}
                onChange={handleInputChange}
                value={userInfo.cardPasswordDigit2}
                className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
            </div>
            <div className="col-span-6 mt-5 sm:col-span-4">
              <label
                htmlFor="accountJumin"
                className="mb-3 flex w-full flex-row text-sm font-medium text-gray-700"
              >
                소유자 주민등록번호
              </label>
              <div className="mb-3 flex w-full">
                <input
                  type="text"
                  name="accountJumin1"
                  maxLength={6}
                  onChange={handleInputChange}
                  value={userInfo.accountJumin1}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="accountJumin2"
                  maxLength={7}
                  onChange={handleInputChange}
                  value={userInfo.accountJumin2}
                  className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
              </div>
            </div>
          </>
        )}

        <div className="col-span-6 mt-3 sm:col-span-4">
          <label
            htmlFor="methodType"
            className="mb-3 block text-sm font-medium text-gray-700"
          >
            관계
          </label>
          <select
            name="methodType"
            value={relation}
            onChange={(e) => {
              setRelation(e.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 bg-white p-4 shadow-sm focus:outline-none sm:text-sm"
          >
            {relationList.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            if (process.env.NEXT_PUBLIC_ENV_VARIABLE === 'development') {
              next();
            }
            const validateJumin12 =
              (userInfo.accountJumin1 + userInfo.accountJumin2).length === 13;
            const validateAccountNumber = userInfo.accountNumber.length < 100;
            const validateCardNumber =
              (
                userInfo.cardNumber1 +
                userInfo.cardNumber2 +
                userInfo.cardNumber3 +
                userInfo.cardNumber4
              ).length < 100;
            const type1 =
              payFeeMethodType?.title === '계좌이체' &&
              validateAccountNumber &&
              validateJumin12;
            const type2 =
              payFeeMethodType?.title === '체크/신용카드 납부' &&
              validateCardNumber &&
              validateJumin12;
            if (type1 || type2) {
              next();
            } else {
              alert('정확한 값을 입력해주세요');
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

export default S11PayFeeMethod;
