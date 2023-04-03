import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const S3HopeNumber = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [hopeNum1st, setHopeNum1st] = useState('');
  const [hopeNum2st, setHopeNum2st] = useState('');

  return (
    <Main>
      <div className="overflow-hidden">
        <h2 className={`${styles.stepTitle}`}>
          새롭게 사용할 전화번호의 <br /> 희망하는 뒷자리를 적어주세요
        </h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          희망번호로 개통되지 않을 수도 있어요
        </h3>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle} mt-6`}>1순위</div>
        <input
          className={`${styles.inputBox} w-full`}
          maxLength={4}
          placeholder={'1234'}
          value={hopeNum1st}
          onChange={(e) => {
            setHopeNum1st(e.target.value);
          }}
          type="text"
        />
        <div className={`${styles.usimSubTitle} mt-6`}>2순위</div>
        <input
          className={`${styles.inputBox} w-full`}
          maxLength={4}
          placeholder={'5678'}
          value={hopeNum2st}
          onChange={(e) => {
            setHopeNum2st(e.target.value);
          }}
          type="text"
        />
        <button
          disabled={hopeNum1st.length !== 4 || hopeNum2st.length !== 4}
          onClick={() => {
            setTotal({
              ...total,
              hopeNum1st,
              hopeNum2st,
            });
            router.push('./S4HowToGetUsim');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S3HopeNumber;
