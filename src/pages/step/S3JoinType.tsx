import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';

const S3JoinType = () => {
  const router = useRouter();
  const [joinTypes] = useState([
    {
      title: '번호이동',
      subTitle: '지금 쓰는 번호 그대로 사용할래요',
    },
    { title: '신규가입', subTitle: '새로운 휴대폰 번호로 가입할래요' },
  ]);
  return (
    <Main>
      <div className="overflow-hidden">
        <h2 className={`${styles.stepTitle}`}>
          어떤 방법으로 <br /> 알뜰폰 가입을 진행할까요?
        </h2>
        <h3 className="text-[16px] text-[#868e96] mt-[8px]">
          스마텔 통신사로 가입을 진행합니다.
        </h3>
        <div className="bg-white w-full mt-[32px]">
          <div className="mt-4 space-y-4">
            {joinTypes.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  const result = { joinType: item.title };
                  sessionStorage.setItem('S3JoinType', JSON.stringify(result));
                  router.push('./S4IsUsim');
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

export default S3JoinType;
