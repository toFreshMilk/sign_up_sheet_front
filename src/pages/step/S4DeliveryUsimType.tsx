import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { Check } from '@/utils/Svgs';

const S4DeliveryUsimType = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
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
      <div>
        <h2 className={`${styles.stepTitle}`}>어떤 유심이 필요하신가요?</h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          유심 종류에 따라 유심비가 부과될 수 있어요
        </h3>
        <div className="mt-[32px] w-full bg-[#fff]">
          <div className="mt-4 space-y-4">
            {usimTypes.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  setTotal({ ...total, needUsimType: item.title });
                  router.push('./S5MobileInfo');
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

export default S4DeliveryUsimType;
