import { useRouter } from 'next/router';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { alttleTelecomList } from '@/utils/PublicData';

const telecomList = [
  { telecomName: 'SKT', selected: false, isAlddle: false },
  { telecomName: 'KT', selected: false, isAlddle: false },
  { telecomName: 'LGU+', selected: false, isAlddle: false },
  { telecomName: 'SKT 알뜰폰', selected: false, isAlddle: true },
  { telecomName: 'KT 알뜰폰', selected: false, isAlddle: true },
  { telecomName: 'LGU+ 알뜰폰', selected: false, isAlddle: true },
];
const S5PhoneNumber = () => {
  const router = useRouter();
  const [selectedTelecom, setSelectedTelecom] = useState(telecomList[0]);
  const [usimNuber, setUsimNumber] = useState('');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [alddleTelecom, setAlddleTelecom] = useState('');

  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>
          연락 가능한 <br /> 휴대폰 번호를 알려주세요
        </h2>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle}`}>통신사</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="통신사를 입력해 주세요"
          value={selectedTelecom?.telecomName || ''}
          onChange={() => {}}
          type="text"
          onClick={() => {
            setBottomSheetOpen(!bottomSheetOpen);
          }}
        />
        <BottomSheet
          snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
          open={bottomSheetOpen}
          onDismiss={() => {
            setBottomSheetOpen(false);
          }}
          skipInitialTransition={false}
          blocking={true}
        >
          <div className={`${styles.bottomSheetStyle}`}>
            <h3 className={`text-[24px] font-bold color-[#2a3037]`}>
              통신사 선택
            </h3>
            <div className={'pt-[8px] pb-[8px]'}>
              {telecomList.map((item, i1) => (
                <div
                  className={`${styles.bottomSheetList}`}
                  key={item.telecomName}
                  onClick={() => {
                    telecomList.map((item2: any, i2: number) => {
                      const temp = item2;
                      temp.selected = false;
                      if (i1 === i2) {
                        temp.selected = true;
                      }
                      return temp;
                    });
                    setBottomSheetOpen(false);
                    setSelectedTelecom(item);
                  }}
                >
                  <p>{item.telecomName}</p>
                  {item.selected ? (
                    <img
                      alt="check"
                      src={`${router.basePath}/assets/images/ic_check_blue.svg`}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </BottomSheet>

        {selectedTelecom?.isAlddle ? (
          <div className={'mt-6'}>
            <div className={`${styles.usimSubTitle}`}>알뜰폰 통신사</div>
            <select
              name="selectedTelecom"
              value={alddleTelecom}
              onChange={(e) => {
                setAlddleTelecom(e.target.value);
              }}
              className={`${styles.inputBox} w-full`}
            >
              {alttleTelecomList.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className={`${styles.usimSubTitle} mt-6`}>일련번호</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="마지막 숫자 8자리를 적어주세요"
          maxLength={8}
          value={usimNuber}
          type="number"
          onChange={(e) => {
            setUsimNumber(e.target.value);
          }}
        />
        <button
          onClick={() => {
            sessionStorage.setItem(
              'S5PhoneNumber',
              JSON.stringify({
                ...selectedTelecom,
                alddleTelecom,
                usimNuber,
              })
            );
            router.push('./S5PhoneNumber');
          }}
          className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S5PhoneNumber;
