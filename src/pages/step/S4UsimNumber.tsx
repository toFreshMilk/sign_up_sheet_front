import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const S4UsimNumber = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [usimModel, setUsimModel] = useState('');
  const [usimNuber, setUsimNumber] = useState('');
  return (
    <Main>
      <div className="">
        <h2 className={`${styles.stepTitle}`}>
          스마텔의 <br /> 유심정보를 적어주세요
        </h2>
        <img
          src={`${router.basePath}/assets/images/usimnumber.jpg`}
          alt={'이미지'}
        />
        <div className={`${styles.usimSubTitle} mt-10`}>유심 모델명</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="유심 모델을 입력해 주세요"
          maxLength={8}
          value={usimModel}
          type="text"
          onChange={(e) => {
            setUsimModel(e.target.value);
          }}
        />
        <div className={`${styles.usimSubTitle} mt-6`}>일련번호</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="마지막 숫자 8자리를 적어주세요"
          maxLength={8}
          value={usimNuber}
          type="number"
          onChange={(e) => {
            setUsimNumber(e.target.value);
          }}
        />
        <button
          disabled={usimModel === '' || usimNuber === ''}
          onClick={() => {
            setTotal({ ...total, S4UsimNumber: { usimModel, usimNuber } });
            router.push('./S5PhoneNumber');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S4UsimNumber;
