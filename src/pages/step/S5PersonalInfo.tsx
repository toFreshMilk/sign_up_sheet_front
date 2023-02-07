import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';

const S5PersonalInfo = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [jumin1, setJumin1] = useState('');
  const [jumin2, setJumin2] = useState('');

  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>
          가입하려는 분의 <br /> 정보를 입력해주세요
        </h2>
        <h3 className="text-[16px] text-[#868e96] mt-[8px]">
          안전하게 보관하고 개통시에만 사용해요
        </h3>
        <br className={'mt-[32px]'} />
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="이름을 입력해 주세요"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="text"
        />
        <div className={'mt-[32px] flex '}>
          <input
            className={`${styles.inputBox} w-full`}
            placeholder="앞자리"
            maxLength={6}
            value={jumin1}
            type="number"
            onChange={(e) => {
              setJumin1(e.target.value);
            }}
          />
          <div className={`${styles.hipen}`}>-</div>
          <input
            className={`${styles.inputBox} w-full`}
            placeholder="뒷자리"
            maxLength={7}
            value={jumin2}
            type="password"
            onChange={(e) => {
              setJumin2(e.target.value);
            }}
          />
        </div>
        <button
          disabled={
            userName === '' || jumin1.length !== 6 || jumin2.length !== 7
          }
          onClick={() => {
            sessionStorage.setItem(
              'S5PersonalInfo',
              JSON.stringify({
                userName,
                jumin1,
                jumin2,
              })
            );
            router.push('./S6Address');
          }}
          className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S5PersonalInfo;
