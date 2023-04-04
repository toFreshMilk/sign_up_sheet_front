import 'react-tooltip/dist/react-tooltip.css';

import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { identificationCheckLG } from '@/utils/Commons';
import { Context } from '@/utils/Context';
import { driverLicenceRegion } from '@/utils/PublicData';
import { QuestionLightly, Warning } from '@/utils/Svgs';

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
    if (total.custommerType === '외국인') {
      inqDvCd = 'FORGN';
    }
    let persFrgnrPsnoEnprNo: string | undefined = '';
    let custNm: string | undefined = '';
    if (total.custommerType === '미성년자') {
      custNm = total.userNameParent;
      persFrgnrPsnoEnprNo = total.jumin34;
    } else {
      custNm = total.userName;
      persFrgnrPsnoEnprNo = total.jumin12;
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
      total.custommerType === '미성년자' ? '법정대리인' : total.userName;
    setWho(whoami);
  }, []);
  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>{who}의 신분증 진위확인</h2>
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
                className={`${styles.inputBox} w-1/6 text-[11px] ${styles.fce11px}`}
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
          <QuestionLightly
            checked={
              identificationType[0].checked ? '주민등록증' : '운전면허증'
            }
          />
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
              <Warning />
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
            // console.log(lgResult);
            if (lgResult.totSuccCd === 'Y') {
              setIdentiWarning(false);
              setTotal({
                ...total,
                identificationType: identificationType[0].checked
                  ? '주민등록증'
                  : '운전면허증',
                monthYear,
                driverNumber: driver1 + driver2 + driver3 + driver4,
              });
              await router.push('./S9SelfAuth');
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
