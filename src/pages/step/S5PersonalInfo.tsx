import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import { S5PersonalInfo1 } from '@/pages/s5PersonalInfo/S5PersonalInfo1';
import { S5PersonalInfo2 } from '@/pages/s5PersonalInfo/S5PersonalInfo2';
import { S5PersonalInfo3 } from '@/pages/s5PersonalInfo/S5PersonalInfo3';
import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const custommerTypesObj = [
  {
    name: '일반 (만 19세 이상)',
    checked: false,
    value: '개인',
    inqDvcd: 'REGID',
  },
  {
    name: '미성년자 (만 19세 미만)',
    checked: false,
    value: '미성년자',
    inqDvcd: 'REGID',
  },
  {
    name: '외국인',
    checked: false,
    value: '외국인',
    inqDvcd: 'FORGN',
  },
];
const S5PersonalInfo = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [custommerTypes, setCustommerTypes] = useState(custommerTypesObj);
  const childRef = useRef(null) as any;
  const childRef2 = useRef(null) as any;
  const childRef3 = useRef(null) as any;
  const toNext = () => {
    const ok1 = childRef.current?.childFunction1();
    const ok2 = childRef2.current?.childFunction1();
    const ok3 = childRef3.current?.childFunction1();
    switch (total.custommerType) {
      case '개인':
        if (ok1) {
          console.log('개인');
          router.push('./S6Address');
        }
        break;
      case '미성년자':
        if (ok1 && ok2) {
          console.log('미성년자');
          router.push('./S6Address');
        }
        break;
      case '외국인':
        if (ok3) {
          console.log('외국인');
          router.push('./S6Address');
        }
        break;
      default:
        console.log('ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ');
    }
  };
  useEffect(() => {
    console.log(total);
  }, []);

  return (
    <Main>
      <h2 className={`${styles.stepTitle}`}>
        가입하려는 분의 <br /> 정보를 입력해주세요
      </h2>
      <h3 className="mt-[8px] text-[16px] text-[#868e96]">
        안전하게 보관하고 개통시에만 사용해요
      </h3>
      <br className={'mt-[32px]'} />
      <div className="w-full space-x-1">
        {custommerTypes.map((item, i) => (
          <button
            key={item.name}
            onClick={() => {
              setTotal({
                ...total,
                custommerType: item.value,
                custommerTypeTitle: item.name,
              });
              custommerTypes.map((v, i2) => {
                const temp = v;
                temp.checked = i === i2;
                return temp;
              });
              setCustommerTypes(custommerTypes);
            }}
            className={`${styles.customerTypeBtn} ${
              item.checked ? styles.customerTypeBtnOn : ''
            }`}
          >
            <div>{item.value}</div>
          </button>
        ))}
      </div>
      <br className={'mt-[32px]'} />
      {custommerTypes[2]?.checked ? (
        <S5PersonalInfo3 ref={childRef3} />
      ) : (
        <S5PersonalInfo1 ref={childRef} />
      )}
      {custommerTypes[1]?.checked ? <S5PersonalInfo2 ref={childRef2} /> : null}
      <button
        onClick={toNext}
        className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
      >
        다음 단계로
      </button>
    </Main>
  );
};

export default S5PersonalInfo;
