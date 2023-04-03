import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { Check } from '@/utils/Svgs';

const S10BillStyle = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [billTypes] = useState([
    { title: '문자로 받을게요' },
    { title: '이메일로 받을게요' },
  ]);
  return (
    <Main>
      <div className="overflow-hidden">
        <h2 className={`${styles.stepTitle}`}>
          요금 청구서를 <br /> 어떤 방법으로 보내드릴까요?
        </h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          이후 고객센터를 통해 변경할 수 있어요
        </h3>
        <div className="mt-[32px] w-full">
          <div className="mt-4 space-y-4">
            {billTypes.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  setTotal({ ...total, billType: item.title });
                  router.push('./S11PaymentInfo');
                }}
                className={`${styles.joinTypeBtn}`}
              >
                <div className={'flex w-full text-left'}>
                  <div className="w-full">
                    <h3 className={`${styles.joinTypeBtn2}`}>{item.title}</h3>
                  </div>
                  <div className={'w-[30px]'}>
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

export default S10BillStyle;
