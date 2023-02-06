import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';

const S4UsimNumber = () => {
  const router = useRouter();
  const [isErr] = useState(false);
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
        {isErr ? (
          <div className={`${styles.usimWarning}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9 3.75a1 1 0 112 0 1 1 0 01-2 0zm1-2.5a1 1 0 001-1v-4a1 1 0 10-2 0v4a1 1 0 001 1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            유심 정보를 다시 확인해 주세요.
          </div>
        ) : null}
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
          onClick={() => {
            sessionStorage.setItem(
              'S4UsimNumber',
              JSON.stringify({ usimModel, usimNuber })
            );
            router.push('./S5PhoneNumber');
          }}
          className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S4UsimNumber;
