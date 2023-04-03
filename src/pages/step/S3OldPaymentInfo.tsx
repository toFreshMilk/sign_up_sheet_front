import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const S3OldPaymentInfo = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [usedMobileNumber, setUsedMobileNumber] = useState('');
  const [usedMobileCompony, setUsedMobileCompony] = useState('');
  const [usedCard4, setUsedCard4] = useState('');
  const [usedBank4, setUsedBank4] = useState('');
  const [paymentType, setPaymentType] = useState([
    {
      title: '카드',
      checked: true,
    },
    {
      title: '계좌이체',
      checked: false,
    },
  ]);
  useEffect(() => {
    setUsedMobileNumber(total.phoneNumber);
    setUsedMobileCompony(total.alddleTelecom);
  }, []);
  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>
          현재 사용하시는 {usedMobileNumber} 번호를 {usedMobileCompony}{' '}
          통신사에서 요금 납부하시고 있는 방법을 선택해주세요
        </h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          현재 번호를 그대로 쓰기위한 추가 인증 정보에요
        </h3>
        <br className={'mt-[32px]'} />
        <div className={'flex justify-center space-x-[8px]'}>
          {paymentType.map((item: any, index: number) => (
            <div
              key={item.title}
              className={`${
                styles.grayBtn
              } w-full p-[18px] text-center text-[16px] font-bold ${
                item.checked ? styles.clickBtn : ''
              }`}
              onClick={() => {
                paymentType.map((item2: any, index2: number) => {
                  const temp = item2;
                  temp.checked = index === index2;
                  return temp;
                });
                setPaymentType([...paymentType]);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
        <br className={'mt-[32px]'} />
        {paymentType[0]?.checked ? (
          <>
            <input
              className={`${styles.inputBox} w-full`}
              maxLength={4}
              placeholder="카드번호 뒤 4자리"
              value={usedCard4}
              type="text"
              onChange={(e) => {
                const inputed = e.target.value.replace(/[^0-9]/g, '');
                setUsedCard4(inputed);
              }}
            />
          </>
        ) : (
          <>
            <input
              className={`${styles.inputBox} w-full`}
              maxLength={4}
              placeholder="계좌번호 뒤 4자리"
              value={usedBank4}
              type="text"
              onChange={(e) => {
                const inputed = e.target.value.replace(/[^0-9]/g, '');
                setUsedBank4(inputed);
              }}
            />
          </>
        )}
        <button
          disabled={false}
          onClick={() => {
            setTotal({
              ...total,
              usedCard4,
              usedBank4,
            });
            router.push('./S5PersonalInfo');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S3OldPaymentInfo;
