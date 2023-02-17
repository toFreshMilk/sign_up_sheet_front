import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import {
  HowToGetUsimSvg1,
  HowToGetUsimSvg2,
  HowToGetUsimSvg3,
} from '@/utils/Svgs';

const S4HowToGetUsim = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [howToGetUsimBtn1, setHowToGetUsimBtn1] = useState({
    title: 'QR 코드로 다운',
    subTitle: '빠른 개통',
    checked: true,
  });
  const [howToGetUsimBtn2, setHowToGetUsimBtn2] = useState({
    title: '배송 받기',
    subTitle: '1~3일 정도 더 걸려요',
    checked: false,
  });
  return (
    <Main>
      <div className="">
        <h2 className={`${styles.stepTitle}`}>유심은 어떻게 받을까요?</h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          유심 종류에 따라 유심비가 부과될 수 있어요
        </h3>
        <div className={'mt-[40px] flex justify-center space-x-[8px]'}>
          <button
            className={`${styles.howToGetUsimBtn} ${
              howToGetUsimBtn1.checked ? styles.howToGetUsimBtnActive : ''
            }`}
            onClick={() => {
              setHowToGetUsimBtn1({ ...howToGetUsimBtn1, checked: true });
              setHowToGetUsimBtn2({ ...howToGetUsimBtn2, checked: false });
            }}
          >
            <div
              className={`${styles.grayBtn} ${styles.howToGetUsimBtnInDiv} ${
                howToGetUsimBtn1.checked
                  ? `${styles.clickBtn} ${styles.howToGetUsimBtnActive2}`
                  : ''
              }`}
            >
              <HowToGetUsimSvg1 />
            </div>
            <div className={`${styles.howToGetUsimBtnContentBox} mt-[16px]`}>
              <div className={`${styles.howToGetUsimBtnContent1}`}>
                QR 코드로 다운
              </div>
              <HowToGetUsimSvg3 />
            </div>
          </button>
          <button
            className={`${styles.howToGetUsimBtn} ${
              howToGetUsimBtn2.checked ? styles.howToGetUsimBtnActive : ''
            }`}
            onClick={() => {
              setHowToGetUsimBtn1({ ...howToGetUsimBtn1, checked: false });
              setHowToGetUsimBtn2({ ...howToGetUsimBtn2, checked: true });
            }}
          >
            <div
              className={`${styles.grayBtn} ${styles.howToGetUsimBtnInDiv} ${
                howToGetUsimBtn2.checked
                  ? `${styles.clickBtn} ${styles.howToGetUsimBtnActive2}`
                  : ''
              }`}
            >
              <HowToGetUsimSvg2 />
            </div>
            <div className={`${styles.howToGetUsimBtnContentBox} mt-[16px]`}>
              <div className={`${styles.howToGetUsimBtnContent1}`}>
                배송 받기
              </div>
              <div className={`${styles.howToGetUsimBtnContent3}`}>
                1~3일 정도 더 걸려요
              </div>
            </div>
          </button>
        </div>
        <br className={'mt-[32px]'} />
        <div>
          {howToGetUsimBtn1.checked ? (
            <ol className={`${styles.listStyle2}`}>
              <li>eSim을 다운받아 사용해요</li>
              <li>유심 배송을 기다지 않아도 돼요</li>
              <li>교통카드 기능을 사용할 수 없어요</li>
            </ol>
          ) : null}
          {howToGetUsimBtn2.checked ? (
            <ol className={`${styles.listStyle2}`}>
              <li>물리적인 유심을 장착해 사용해요</li>
              <li>유심 배송을 기다려야 해요</li>
              <li>NFC 유심을 선택하면 삼성페이를 사용할 수 있어요</li>
            </ol>
          ) : null}
        </div>
      </div>
      <button
        onClick={() => {
          const goal = howToGetUsimBtn1.checked
            ? './S4EsimInfo'
            : './S4DeliveryUsimType';
          const result = howToGetUsimBtn1.checked ? 'Esim' : '배송 받기';
          setTotal({ ...total, howToGetUsim: result });
          router.push(goal);
        }}
        className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
      >
        다음
      </button>
      <button
        onClick={() => {
          setTotal({ ...total, howToGetUsim: '유심 있음' });
          router.push('./S4OwnUsimNumber');
        }}
        className={`${styles.nextBtn2} flex w-full justify-center`}
      >
        스마텔 유심이 이미 있어요
      </button>
    </Main>
  );
};

export default S4HowToGetUsim;
