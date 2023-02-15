import 'react-tooltip/dist/react-tooltip.css';

import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { identificationCheckLG } from '@/utils/Commons';
import { Context } from '@/utils/Context';
import { driverLicenceRegion } from '@/utils/PublicData';

const identificationTypes = [
  {
    title: '주민등록증',
    checked: true,
    val: 'REGID',
  },
  {
    title: '운전면허증',
    checked: false,
    val: 'DRIVE',
  },
] as any;
const S8Identification = () => {
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
  const [identiWarning, setIdentiWarning] = useState(false);

  const checkIdentification = async () => {
    let inqDvCd = identificationType[0]?.checked ? 'REGID' : 'DRIVE';
    if (total.S1UserType.value === '외국인') {
      inqDvCd = 'FORGN';
    }
    let persFrgnrPsnoEnprNo: string | undefined = '';
    let custNm: string | undefined = '';
    if (total.S1UserType.value === '미성년자') {
      persFrgnrPsnoEnprNo =
        total.S5PersonalInfoParent.jumin3 + total.S5PersonalInfoParent.jumin4;
      custNm = total.S5PersonalInfoParent.userNameParent;
    } else {
      persFrgnrPsnoEnprNo =
        total.S5PersonalInfo.jumin1 + total.S5PersonalInfo.jumin2;
      custNm = total.S5PersonalInfo.userName;
    }
    const identiParts = {
      inqDvCd,
      custNm: custNm?.toUpperCase(),
      persFrgnrPsnoEnprNo,
      isuDt: monthYear,
      drvLcnsNo: driver1 + driver2 + driver3 + driver4,
    };
    const lgResult = await identificationCheckLG(identiParts);

    return lgResult;
  };
  useEffect(() => {
    const whoami =
      total.S1UserType?.value === '미성년자'
        ? '법정대리인'
        : total.S5PersonalInfo?.userName;
    setWho(whoami);
  }, []);
  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>
          {who}님의 신분증 <br /> 정보를 입력해주세요
        </h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          부정가입방지를 위한 과정이에요
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
            ></path>
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
        {identiWarning ? (
          <div className="mt-[24px]">
            <div className={`${styles.juminWaring}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9 3.75a1 1 0 112 0 1 1 0 01-2 0zm1-2.5a1 1 0 001-1v-4a1 1 0 10-2 0v4a1 1 0 001 1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              신분증을 다시 확인해 주세요
            </div>
          </div>
        ) : null}
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
            const lgResult = await checkIdentification();
            console.log(lgResult);
            if (lgResult.totSuccCd === 'Y') {
              setIdentiWarning(false);
              setTotal({
                ...total,
                S8Identification: {
                  identificationType,
                  monthYear,
                  driverNumber: driver1 + driver2 + driver3 + driver4,
                },
              });
              router.push('./S9SelfAuth');
            } else {
              setIdentiWarning(true);
            }
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S8Identification;
