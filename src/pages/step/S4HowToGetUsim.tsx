import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const S4HowToGetUsim = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [howToGetUsimBtn1, setHowToGetUsimBtn1] = useState({
    title: 'QR 코드로 다운',
    subTitle: '빠른 개통이 가능합니다',
    checked: false,
  });
  const [howToGetUsimBtn2, setHowToGetUsimBtn2] = useState({
    title: '배송 받기',
    subTitle: '1~3일 정도 더 걸려요',
    checked: true,
  });
  const [usimTypes] = useState([
    {
      title: '일반 유심',
      subTitle: '유심비 무료, 배송비 무료',
    },
    {
      title: 'NFC 유심',
      subTitle: '유심비 4,400원 청구될 예정이며, 배송비는 무료입니다.',
    },
  ]);
  return (
    <Main>
      <div className="">
        <h2 className={`${styles.stepTitle}`}>유심은 어떻게 받을까요?</h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          유심 종류에 따라 유심비가 부과될 수 있어요
        </h3>
        <div className={'mt-[40px] flex space-x-[8px]'}>
          <button
            className={`${styles.howToGetUsimBtn} ${
              howToGetUsimBtn1.checked ? styles.howToGetUsimBtnActive : ''
            }`}
            onClick={() => {
              setHowToGetUsimBtn1({ ...howToGetUsimBtn1, checked: true });
              setHowToGetUsimBtn2({ ...howToGetUsimBtn2, checked: false });
            }}
          >
            <img
              alt="esim"
              src={`${router.basePath}/assets/images/esimImg.png`}
              className={`${styles.grayBtn} ${styles.howToGetUsimBtnInImg} ${
                howToGetUsimBtn1.checked
                  ? `${styles.clickBtn} ${styles.howToGetUsimBtnActive2}`
                  : ''
              }`}
            />
            <div className={`${styles.howToGetUsimBtnContentBox} mt-[16px]`}>
              <div className={`${styles.howToGetUsimBtnContent1}`}>
                eSim 개통하기
              </div>
              <div className={`${styles.howToGetUsimBtnContent3}`}>
                빠르게 개통이 가능합니다.
              </div>
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
            <img
              alt="usim"
              src={`${router.basePath}/assets/images/usimImg.png`}
              className={`${styles.grayBtn} ${styles.howToGetUsimBtnInImg} ${
                howToGetUsimBtn2.checked
                  ? `${styles.clickBtn} ${styles.howToGetUsimBtnActive2}`
                  : ''
              }`}
            />
            <div className={`${styles.howToGetUsimBtnContentBox} mt-[16px]`}>
              <div className={`${styles.howToGetUsimBtnContent1}`}>
                USIM 개통하기
              </div>
              <div className={`${styles.howToGetUsimBtnContent3}`}>
                미보유시 배송 받아야 합니다.
              </div>
            </div>
          </button>
        </div>
        <br className={'mt-[32px]'} />
        <div>
          {howToGetUsimBtn1.checked ? (
            <ol className={`${styles.listStyle2}`}>
              <li>유심 없이 개통이 가능합니다.</li>
              <li>eSIM 발급 비용 2,750원이 첫 달만 청구됩니다.</li>
              <li>eSIM을 지원하는 휴대폰에서만 가능합니다.</li>
            </ol>
          ) : null}
        </div>
      </div>
      {howToGetUsimBtn1.checked ? (
        <button
          onClick={() => {
            setTotal({ ...total, howToGetUsim: 'Esim' });
            router.push('./S4EsimInfo');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음
        </button>
      ) : null}
      {howToGetUsimBtn2.checked ? (
        <>
          <div className="space-y-4">
            {usimTypes.map((item) => (
              <button
                key={item.title}
                onClick={() => {
                  setTotal({ ...total, needUsimType: item.title });
                  router.push('./S5MobileInfo');
                }}
                className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
              >
                <div className={'flex w-full text-left'}>
                  <div className="w-full">
                    <h3>{item.title}</h3>
                    <h3 className={'text-[12px]'}>{item.subTitle}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setTotal({ ...total, howToGetUsim: '유심 있음' });
              router.push('./S4AldyOwnUsimInfo');
            }}
            className={`${styles.nextBtn2} flex w-full justify-center`}
          >
            스마텔 유심이 이미 있어요
          </button>
        </>
      ) : null}
    </Main>
  );
};

export default S4HowToGetUsim;
