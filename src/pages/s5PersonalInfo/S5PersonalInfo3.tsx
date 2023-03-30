import { forwardRef, useContext, useImperativeHandle, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { juminRuleTest } from '@/utils/Commons';
import { Context } from '@/utils/Context';
import { Warning } from '@/utils/Svgs';

export const S5PersonalInfo3 = forwardRef((_props, ref) => {
  const { total, setTotal } = useContext(Context) as any;
  const [userName, setUserName] = useState('');
  const [jumin1, setJumin1] = useState('');
  const [jumin2, setJumin2] = useState('');
  const [verifyCHeckJumin, setVerifyCHeckJumin] = useState(true);
  useImperativeHandle(ref, () => ({
    childFunction1() {
      console.log('child function 33333333333 called');
      const isOk = juminRuleTest(`${jumin1}-${jumin2}`);
      setVerifyCHeckJumin(isOk);
      if (isOk) {
        setTotal({
          ...total,
          userName,
          jumin12: jumin1 + jumin2,
          jumin1,
        });
      }
      return isOk;
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
            외국인번호를 다시 확인해 주세요
          </div>
        </div>
      )}
    </>
  );
});
S5PersonalInfo3.displayName = 'S5PersonalInfo3';
export default S5PersonalInfo3;
