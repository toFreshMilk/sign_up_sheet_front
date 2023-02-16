import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const S7Email = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
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
            setTotal({ ...total, S7Email: email });
            router.push('./S8Identification');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S7Email;
