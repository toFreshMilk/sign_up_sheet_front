import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { ArrowSvg, SettingSvg } from '@/utils/Svgs';

const S4EsimUniqNumber = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [eid, setEid] = useState('');
  const [imei, setImei] = useState('');
  const [imei2, setImei2] = useState('');
  return (
    <Main>
      <div className="overflow-hidden">
        <h2 className={`${styles.stepTitle}`}>
          eSim 개통을 위해 <br /> 고유번호를 입력해주세요
        </h2>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle} mt-6`}>EID</div>
        <input
          className={`${styles.inputBox} w-full`}
          maxLength={32}
          placeholder={'EID'}
          value={eid}
          onChange={(e) => {
            setEid(e.target.value);
          }}
          type="text"
        />
        <div className={`${styles.usimSubTitle} mt-6`}>IMEI</div>
        <input
          className={`${styles.inputBox} w-full`}
          maxLength={15}
          placeholder={'IMEI'}
          value={imei}
          onChange={(e) => {
            setImei(e.target.value);
          }}
          type="text"
        />
        <div className={`${styles.usimSubTitle} mt-6`}>IMEI2</div>
        <input
          className={`${styles.inputBox} w-full`}
          maxLength={15}
          placeholder={'IMEI2'}
          value={imei2}
          onChange={(e) => {
            setImei2(e.target.value);
          }}
          type="text"
        />
        <div className={'mt-[24px]'}>
          <div className={`${styles.howToCheck}`}>확인방법</div>
          <div className={'mt-[16px] text-left text-[18px]'}>방법 1</div>
          <div className={'mt-[16px] mb-[24px] text-left text-[16px]'}>
            <a
              href="tel:*%2306%23"
              className={'text-[16px] font-bold text-[#6679d8]'}
            >
              *#06#
            </a>
            으로 전화를 걸어 나오는 <b>바코드 3개</b>가 모두 확인할 수 있어요
          </div>
          <div className={'flex justify-center'}>
            <img
              src={`${router.basePath}/assets/images/esim_device_barcode_guid.webp`}
              alt={'img'}
              className={'w-[270px]'}
            />
          </div>
          <div className={'mt-[16px] text-left text-[18px]'}>방법 2</div>
          <div className={`${styles.howToCheckSub} mb-[24px]`}>
            <span className={'mr-[6px]'}>
              <SettingSvg />
            </span>
            <span className={'mr-[6px]'}>설정</span>
            <span className={'mr-[6px]'}>
              <ArrowSvg />
            </span>
            <span className={'mr-[6px]'}>휴대전화 정보</span>
            <span className={'mr-[6px]'}>
              <ArrowSvg />
            </span>
            <span className={'mr-[6px]'}>상태 정보에서 확인할 수 있어요</span>
          </div>
          <div className={'mb-[5px] flex justify-center'}>
            <img
              src={`${router.basePath}/assets/images/esim_samsung_device_guide_1.webp`}
              alt={'img'}
              className={'w-[270px]'}
            />
          </div>
          <div className={'flex justify-center'}>
            <img
              src={`${router.basePath}/assets/images/esim_samsung_device_guide_2.webp`}
              alt={'img'}
              className={'w-[270px]'}
            />
          </div>
        </div>

        <button
          disabled={
            eid.length !== 32 || imei.length !== 15 || imei2.length !== 15
          }
          onClick={() => {
            setTotal({
              ...total,
              eid,
              imei,
              imei2,
            });
            router.push('./S5MobileInfo');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S4EsimUniqNumber;
