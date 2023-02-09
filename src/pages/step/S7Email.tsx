import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';

const S7Email = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
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
          disabled={!regex.test(email)}
          onClick={() => {
            sessionStorage.setItem(
              'S7Email',
              JSON.stringify({
                email,
              })
            );
            router.push('./S8Identification');
          }}
          className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S7Email;
