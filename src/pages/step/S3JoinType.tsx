import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { Check } from '@/utils/Svgs';

const S3JoinType = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
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
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          스마텔 통신사로 가입을 진행합니다.
        </h3>
        <div className="mt-[32px] w-full">
          <div className="mt-4 space-y-4">
            {joinTypes.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  setTotal({ ...total, joinType: item.title });
                  router.push('./S3machineType');
                }}
                className={`${styles.joinTypeBtn}`}
              >
                <div className={'flex w-full text-left'}>
                  <div className="w-full">
                    <h3 className={`${styles.joinTypeBtn2}`}>{item.title}</h3>
                    <h3 className={`${styles.joinTypeBtn3}`}>
                      {item.subTitle}
                    </h3>
                  </div>
                  <div className={'w-[30px] pt-[10px]'}>
                    <Check />
                  </div>
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
