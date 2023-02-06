import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';

interface Aaa {
  title: string;
  checked: boolean;
}
const isUsimObj = [
  { title: '없어요(택배 요청)', checked: true, val: '유심 없음' },
  { title: '가지고 있어요', checked: false, val: '유심 보유' },
] as any;
const S4Usim1 = () => {
  const router = useRouter();
  const [isUsim, setIsUsim] = useState(isUsimObj);
  return (
    <Main>
      <div className="">
        <h2 className={`${styles.stepTitle}`}>
          스마텔의 <br /> 유심을 가지고 있나요?
        </h2>
        <h3 className="text-[16px] text-color-[#000] mt-[8px]">
          기존 유심이 아닌 스마텔의 유심이 필요해요
        </h3>
        <div className={'mt-[80px] flex justify-center space-x-[8px]'}>
          {isUsim.map((item: Aaa, index: number) => (
            <div
              key={item.title}
              className={`${
                styles.grayBtn
              } w-full text-[16px] text-center p-[18px] font-bold ${
                item.checked ? styles.clickBtn : ''
              }`}
              onClick={() => {
                isUsimObj.map((item2: Aaa, index2: number) => {
                  const temp = item2;
                  temp.checked = false;
                  if (index === index2) {
                    temp.checked = true;
                  }
                  return temp;
                });
                setIsUsim([...isUsimObj]);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
        {isUsim[0]?.checked ? (
          <ol className={'mt-[32px] pl-[12px]'}>
            <li
              className={`${styles.listStyle} text-[14px] text-color-gray mb-[8px] leading-[1.5]`}
            >
              유심 배송은 신청 후 영업일 기준 약 1~3일 정도 더 소요될 수 있어요.
            </li>
          </ol>
        ) : null}
      </div>
      <button
        onClick={() => {
          const result = isUsim.filter((item: Aaa) => item.checked);
          sessionStorage.setItem(
            'S4Usim1',
            JSON.stringify({ usimType: result.val })
          );
          router.push('./S4Usim2');
        }}
        className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
      >
        다음
      </button>
    </Main>
  );
};

export default S4Usim1;
