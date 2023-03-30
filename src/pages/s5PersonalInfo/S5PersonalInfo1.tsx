import { useRouter } from 'next/router';
import { forwardRef, useContext, useImperativeHandle, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Context } from '@/utils/Context';
import { Warning } from '@/utils/Svgs';

export const S5PersonalInfo1 = forwardRef((props, ref) => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [userName, setUserName] = useState('');
  const [jumin1, setJumin1] = useState('');
  const [jumin2, setJumin2] = useState('');
  const [verifyCHeckJumin, setVerifyCHeckJumin] = useState(true);
  useImperativeHandle(ref, () => ({
    childFunction1() {
      console.log('child function 1 called');
      console.log(props);
      const juminRule =
        /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
      const isOk = juminRule.test(`${jumin1}-${jumin2}`);
      setVerifyCHeckJumin(isOk);
      if (isOk) {
        setTotal({
          ...total,
          userName,
          jumin12: jumin1 + jumin2,
          jumin1,
        });
        router.push('./S6Address');
      }
    },
  }));
  return (
    <>
      <input
        className={`${styles.inputBox} w-full`}
        placeholder="이름을 입력해 주세요"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        type="text"
      />
      <div className={'mt-[32px] flex'}>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="앞자리"
          maxLength={6}
          value={jumin1}
          type="text"
          onChange={(e) => {
            const regex = /[^0-9]/g;
            setJumin1(e.target.value.replace(regex, ''));
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
            const regex = /[^0-9]/g;
            setJumin2(e.target.value.replace(regex, ''));
          }}
        />
      </div>
      {verifyCHeckJumin ? null : (
        <div className="mt-[24px]">
          <div className={`${styles.juminWaring}`}>
            <Warning />
            주민등록번호를 다시 확인해 주세요
          </div>
        </div>
      )}
    </>
  );
});
S5PersonalInfo1.displayName = 'S5PersonalInfo1';
