import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { ArrowSvg, SettingSvg } from '@/utils/Svgs';

const S4EsimInfo = () => {
  const router = useRouter();
  const [modelName, setModelName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [serial, setSerial] = useState('');
  const [radio, setRadio] = useState(true);
  useEffect(() => {
    const s3 = sessionStorage.getItem('S3machineType') || '';
    const s3Parse = JSON.parse(s3);
    setModelName(s3Parse.modelName);
  }, []);
  return (
    <Main>
      <div className="overflow-hidden">
        <h2 className={`${styles.stepTitle}`}>
          eSim 개통을 위해 <br /> 휴대폰 정보를 입력해주세요
        </h2>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle} mt-6`}>모델명</div>
        <input
          className={`${styles.inputBox} w-full`}
          defaultValue={modelName}
          type="text"
        />
        <div className={`${styles.usimSubTitle} mt-6`}>용량</div>
        <select
          value={capacity}
          onChange={(e) => {
            setCapacity(e.target.value);
          }}
          className={`${styles.inputBox} w-full`}
        >
          <option value={'256G'}>256G</option>
          <option value={'512G'}>512G</option>
        </select>
        <div className={`${styles.usimSubTitle} mt-10`}>일련번호</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="예) DV2F3T4DFV"
          value={serial}
          type="text"
          onChange={(e) => {
            setSerial(e.target.value);
          }}
        />
        <br className={'mt-[32px]'} />
        <div className={`${styles.s4EsimRadioWrapper}`}>
          <div
            className={`${styles.s4EsimRadioWrapperInDiv} ${
              radio ? styles.s4EsimRadioOn : styles.s4EsimRadioOff
            }`}
          ></div>
          <div className={`${styles.s4EsimRadio}`}>
            <button
              onClick={() => {
                setRadio(true);
              }}
            >
              아이폰
            </button>
            <button
              onClick={() => {
                setRadio(false);
              }}
            >
              삼성
            </button>
          </div>
        </div>
        <div className={'mt-[24px]'}>
          <div className={`${styles.howToCheck}`}>확인방법</div>
          <div className={`${styles.howToCheckSub} mb-[24px]`}>
            <span className={'mr-[6px]'}>
              <SettingSvg />
            </span>
            <span className={'mr-[6px]'}>설정</span>
            <span className={'mr-[6px]'}>
              <ArrowSvg />
            </span>
            <span className={'mr-[6px]'}>
              {radio ? '일반' : '휴대전화 정보'}
            </span>
            <span className={'mr-[6px]'}>
              <ArrowSvg />
            </span>
            <span className={'mr-[6px]'}>
              {radio ? (
                <>
                  정보에서 <b>3가지 정보</b> 모두 확인할 수 있어요
                </>
              ) : (
                '규제 정보에서 확인할 수 있어요'
              )}
            </span>
          </div>
          <div className={'flex justify-center'}>
            <img
              src={`${router.basePath}/assets/images/${
                radio
                  ? 'esim_ios_phone_guide.webp'
                  : 'esim_samsung_phone_guide.webp'
              }`}
              alt={'img'}
              className={'w-[270px]'}
            />
          </div>
        </div>

        <button
          onClick={() => {
            sessionStorage.setItem(
              'S4EsimInfo',
              JSON.stringify({
                modelName,
                capacity,
                serial,
                factory: radio ? '아이폰' : '삼성',
              })
            );
            router.push('./S4EsimUniqNumber');
          }}
          className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S4EsimInfo;
