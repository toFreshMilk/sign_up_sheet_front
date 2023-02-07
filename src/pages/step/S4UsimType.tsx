import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';

const S4UsimType = () => {
  const router = useRouter();
  const [usimTypes] = useState([
    {
      title: '일반 유심',
      subTitle: '삼성페이는 사용할 수 있어요',
    },
    {
      title: 'NFC 유심',
      subTitle: '교통카드 기능을 사용할 수 있어요',
    },
  ]);
  return (
    <Main>
      <div className="">
        <h2 className={`${styles.stepTitle}`}>어떤 유심이 필요하신가요?</h2>
        <h3 className="text-[16px] text-[#868e96] mt-[8px]">
          유심 종류에 따라 유심비가 부과될 수 있어요
        </h3>
        <div className="bg-white w-full mt-[32px]">
          <div className="mt-4 space-y-4">
            {usimTypes.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  const result = { joinType: item.title };
                  sessionStorage.setItem('S4UsimType', JSON.stringify(result));
                  router.push('./S5PhoneNumber');
                }}
                className={`${styles.joinTypeBtn}`}
              >
                <div className={'text-left relative w-full'}>
                  <div className="w-4/5">
                    <h3 className={`${styles.joinTypeBtn2}`}>{item.title}</h3>
                    <h3 className={`${styles.joinTypeBtn3}`}>
                      {item.subTitle}
                    </h3>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="text-gray-400 w-7 absolute right-0 top-3"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm5.207-11.793a1 1 0 00-1.414-1.414L11 13.586l-2.793-2.793a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0l5.5-5.5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default S4UsimType;
