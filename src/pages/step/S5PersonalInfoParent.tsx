import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const S5PersonalInfoParent = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [userNameParent, setUserNameParent] = useState('');
  const [jumin3, setJumin3] = useState('');
  const [jumin4, setJumin4] = useState('');
  const [verifyCHeckJumin, setVerifyCHeckJumin] = useState(true);

  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>
          법정대리인의 <br /> 정보를 입력해주세요
        </h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          안전하게 보관하고 개통시에만 사용해요
        </h3>
        <br className={'mt-[32px]'} />
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="이름을 입력해 주세요"
          value={userNameParent}
          onChange={(e) => {
            setUserNameParent(e.target.value);
          }}
          type="text"
        />
        <div className={'mt-[32px] flex'}>
          <input
            className={`${styles.inputBox} w-full`}
            placeholder="앞자리"
            maxLength={6}
            value={jumin3}
            type="text"
            onChange={(e) => {
              const regex = /[^0-9]/g;
              setJumin3(e.target.value.replace(regex, ''));
            }}
          />
          <div className={`${styles.hipen}`}>-</div>
          <input
            className={`${styles.inputBox} w-full`}
            placeholder="뒷자리"
            maxLength={7}
            value={jumin4}
            type="password"
            onChange={(e) => {
              const regex = /[^0-9]/g;
              setJumin4(e.target.value.replace(regex, ''));
            }}
          />
        </div>
        {verifyCHeckJumin ? null : (
          <div className="mt-[24px]">
            <div className={`${styles.juminWaring}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-9 3.75a1 1 0 112 0 1 1 0 01-2 0zm1-2.5a1 1 0 001-1v-4a1 1 0 10-2 0v4a1 1 0 001 1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              주민등록번호를 다시 확인해 주세요
            </div>
          </div>
        )}
        <button
          disabled={
            userNameParent === '' || jumin3.length !== 6 || jumin4.length !== 7
          }
          onClick={() => {
            const juminRule =
              /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
            const isOk = juminRule.test(`${jumin3}-${jumin4}`);
            setVerifyCHeckJumin(isOk);
            if (isOk) {
              setTotal({
                ...total,
                S5PersonalInfoParent: {
                  userNameParent,
                  jumin34: jumin3 + jumin4,
                  jumin3,
                  jumin4,
                },
              });
              router.push('./S6Address');
            }
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S5PersonalInfoParent;
