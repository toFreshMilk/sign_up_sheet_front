import 'react-tooltip/dist/react-tooltip.css';

import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { driverLicenceRegion } from '@/utils/PublicData';

const identificationTypes = [
  {
    title: '카드',
    checked: true,
    val: 'REGID',
  },
  {
    title: '계좌이체',
    checked: false,
    val: 'DRIVE',
  },
] as any;
const S11PaymentInfo = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [who, setWho] = useState('');
  const [driver1, setDriver1] = useState('11');
  const [driver2, setDriver2] = useState('');
  const [driver3, setDriver3] = useState('');
  const [driver4, setDriver4] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [identificationType, setIdentificationType] =
    useState(identificationTypes);

  useEffect(() => {
    setWho(total.S5PersonalInfo?.userName);
  }, []);
  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>요금 납부 방법을 선택해주세요</h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          {who}님 명의의 정보를 알려주세요 <br /> 이후 고객센터를 통해 변경할 수
          있어요
        </h3>
        <br className={'mt-[32px]'} />
        <div className={'flex justify-center space-x-[8px]'}>
          {identificationTypes.map((item: any, index: number) => (
            <div
              key={item.title}
              className={`${
                styles.grayBtn
              } w-full p-[18px] text-center text-[16px] font-bold ${
                item.checked ? styles.clickBtn : ''
              }`}
              onClick={() => {
                identificationTypes.map((item2: any, index2: number) => {
                  const temp = item2;
                  temp.checked = index === index2;
                  return temp;
                });
                setIdentificationType([...identificationTypes]);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
        <br className={'mt-[32px]'} />
        {identificationType[1].checked ? (
          <>
            <div className={`${styles.usimSubTitle}`}>운전면허번호</div>
            <div className={'flex justify-items-center'}>
              <select
                name="selectedTelecom"
                value={driver1}
                onChange={(e) => {
                  setDriver1(e.target.value);
                }}
                className={`${styles.inputBox} w-1/6`}
              >
                {driverLicenceRegion.map((item) => (
                  <option key={item.name} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className={`${styles.hipen}`}>-</div>
              <input
                className={`${styles.inputBox} w-1/6`}
                value={driver2}
                onChange={(e) => {
                  setDriver2(e.target.value);
                }}
                type="text"
              />
              <div className={`${styles.hipen}`}>-</div>
              <input
                className={`${styles.inputBox} w-2/6`}
                value={driver3}
                onChange={(e) => {
                  setDriver3(e.target.value);
                }}
                type="text"
              />
              <div className={`${styles.hipen}`}>-</div>
              <input
                className={`${styles.inputBox} w-1/6`}
                value={driver4}
                onChange={(e) => {
                  setDriver4(e.target.value);
                }}
                type="text"
              />
            </div>
          </>
        ) : null}
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle} flex justify-items-center`}>
          <div className={'mr-[4px]'}>발급일자</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-[20px] w-[20px] text-[#dee1e7]"
            data-tooltip-content={`${
              identificationType[0].checked ? '주민등록증' : '운전면허증'
            } 앞면 하단의 날짜를 적어주세요`}
            id={'publishedDate'}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.91699 12.0635V11.9238C8.92334 10.3433 9.34863 9.86084 10.1104 9.38477C10.6562 9.0293 11.0815 8.63574 11.0752 8.05176C11.0815 7.41699 10.5864 7.00439 9.9707 6.99805C9.38037 7.00439 8.82812 7.39795 8.80273 8.14062H7C7.03174 6.35693 8.3584 5.5 9.9834 5.5C11.7544 5.5 13.0049 6.42041 13.0049 7.98828C13.0049 9.03564 12.4653 9.6958 11.6338 10.1973C10.9165 10.6226 10.5991 11.0352 10.5928 11.9238V12.0635H8.91699ZM9.79297 14.9326C9.19629 14.9326 8.71387 14.4565 8.72656 13.8662C8.71387 13.2822 9.19629 12.8062 9.79297 12.8125C10.3579 12.8062 10.8467 13.2822 10.8467 13.8662C10.8467 14.4565 10.3579 14.9326 9.79297 14.9326Z"
            />
          </svg>
          <ReactTooltip anchorId="publishedDate" />
        </div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="20201010"
          value={monthYear}
          onChange={(e) => {
            setMonthYear(e.target.value);
          }}
          type="text"
        />
        <button
          disabled={
            identificationType[0].checked
              ? monthYear.length !== 8
              : monthYear.length !== 8 ||
                driver2.length !== 2 ||
                driver3.length !== 6 ||
                driver4.length !== 2
          }
          onClick={async () => {
            setTotal({
              ...total,
              S11PaymentInfo: {
                identificationType,
                monthYear,
                driverNumber: driver1 + driver2 + driver3 + driver4,
              },
            });
            router.push('./S9SelfAuth');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S11PaymentInfo;
