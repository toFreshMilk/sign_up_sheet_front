import 'react-tooltip/dist/react-tooltip.css';

import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { NaverDetail, TossDetail, CreditDetail } from '@/utils/AuthDetails';
import { Context } from '@/utils/Context';
import { QuestionSvg } from '@/utils/Svgs';

const logoList = [
  {
    name: '네이버',
    alt: '네이버인증',
    fileName: 'logo_naver.svg',
    uniqCss: `${styles.logoBoxNaver}`,
  },
  {
    name: '토스',
    alt: '토스인증',
    fileName: 'logo_toss.svg',
    uniqCss: `${styles.logoBoxToss}`,
  },
  {
    name: '신용카드',
    alt: '신용카드인증',
    fileName: 'logo_credit.svg',
    uniqCss: `${styles.logoBoxCredit}`,
  },
];

const S9SelfAuth = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [showDetailInfo, setShowDetailInfo] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const authInfoPage = (_item: any) => {
    let component: JSX.Element;
    switch (_item.name) {
      case '네이버':
        component = <NaverDetail setShowDetailInfo={setShowDetailInfo} />;
        break;
      case '토스':
        component = <TossDetail setShowDetailInfo={setShowDetailInfo} />;
        break;
      case '신용카드':
        component = <CreditDetail setShowDetailInfo={setShowDetailInfo} />;
        break;
      case 'qna':
        component = <div>네이버4</div>;
        break;
      default:
        component = <div></div>;
    }
    return component;
  };
  const clickLogo = (_item: any, _idx: number) => {
    setSelectedIdx(_idx);
    setShowDetailInfo(!showDetailInfo);
  };
  useEffect(() => {
    console.log('lgResult');
  }, []);
  return (
    <Main>
      {showDetailInfo ? (
        authInfoPage(logoList[selectedIdx])
      ) : (
        <div>
          <h2 className={`${styles.stepTitle}`}>
            알뜰폰 신청을 위해 <br /> 본인인증을 진행할게요
          </h2>
          <h3 className="mt-[8px] text-[16px] text-[#868e96]">
            가능한 방법으로 선택해주세요
          </h3>
          <div className={`${styles.stepTitle}`}>
            <div className="flex flex-row justify-center px-3">
              {logoList.map((item, idx) => (
                <div
                  className="w-full"
                  key={item.name}
                  onClick={() => {
                    clickLogo(item, idx);
                  }}
                >
                  <div className={`${styles.authComponyList}`}>
                    <div className={`${styles.logoBox} ${item.uniqCss}`}>
                      <img
                        alt="네이버인증"
                        src={`${router.basePath}/assets/images/${item.fileName}`}
                      />
                    </div>
                    <div className={`${styles.logoContent}`}>{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={'mt-[40px] flex justify-center'}>
            <button
              className="flex items-center rounded-lg bg-gray-200 py-[8px] px-[12px] text-[14px] font-medium text-gray-600"
              onClick={() => {
                clickLogo(item, idx);
              }}
            >
              <QuestionSvg />
              인증에 어려움이 있으신가요?
            </button>
          </div>
          <button
            disabled={false}
            onClick={() => {
              setTotal({ ...total, S8Identification: '' });
              router.push('./S9SelfAuth').then((r) => {
                console.log(r);
                console.log('r???');
              });
            }}
            className={`${styles.nextBtn} mt-[400px] flex w-full justify-center`}
          >
            다음 단계로
          </button>
        </div>
      )}
    </Main>
  );
};

export default S9SelfAuth;
