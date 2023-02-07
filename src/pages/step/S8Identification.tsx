import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';

const S8Identification = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>
          고객님의 <br /> 이메일을 입력해주세요
        </h2>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle}`}>이메일</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="smartel@smartel.co.kr"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
        />
        <button
          disabled={email === ''}
          onClick={() => {
            sessionStorage.setItem(
              'S7Email',
              JSON.stringify({
                email,
              })
            );
            router.push('./S7Email');
          }}
          className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S8Identification;
