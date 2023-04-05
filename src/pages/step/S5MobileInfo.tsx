import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import {
  alttleTelecomList1,
  alttleTelecomList2,
  alttleTelecomList3,
} from '@/utils/PublicData';

const telecomList = [
  { telecomName: 'SKT', selected: false, isAlddle: false },
  { telecomName: 'KT', selected: false, isAlddle: false },
  { telecomName: 'LGU+', selected: false, isAlddle: false },
  { telecomName: 'SKT 알뜰폰', selected: false, isAlddle: true },
  { telecomName: 'KT 알뜰폰', selected: false, isAlddle: true },
  { telecomName: 'LGU+ 알뜰폰', selected: false, isAlddle: true },
];
const S5MobileInfo = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [selectedTelecom, setSelectedTelecom] = useState({
    telecomName: '',
    selected: false,
    isAlddle: false,
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [alddleTelecom, setAlddleTelecom] = useState('');
  const [selectedAlttleMang, aetSelectedAlttleMang] =
    useState(alttleTelecomList1);

  useEffect(() => {
    setBottomSheetOpen(true);
  }, []);
  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>
          스마텔 알뜰폰으로 <br /> 이용하고자 하는 휴대폰 번호를 알려주세요
        </h2>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle}`}>통신사</div>
        <input
          readOnly={true}
          className={`${styles.inputBox} w-full`}
          placeholder="통신사 선택"
          value={selectedTelecom?.telecomName}
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
            <h3 className={`text-[24px] font-bold text-[#2a3037]`}>
              통신사 선택
            </h3>
            <div className={'py-[8px]'}>
              {telecomList.map((item, i1) => (
                <div
                  className={`${styles.bottomSheetList}`}
                  key={item.telecomName}
                  onClick={() => {
                    telecomList.map((item2: any, i2: number) => {
                      const temp = item2;
                      temp.selected = i1 === i2;
                      return temp;
                    });
                    setBottomSheetOpen(false);
                    setSelectedTelecom(item);
                    if (item.telecomName === 'SKT 알뜰폰') {
                      aetSelectedAlttleMang(alttleTelecomList1);
                    } else if (item.telecomName === 'KT 알뜰폰') {
                      aetSelectedAlttleMang(alttleTelecomList2);
                    } else if (item.telecomName === 'LGU+ 알뜰폰') {
                      aetSelectedAlttleMang(alttleTelecomList3);
                    }
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
            <input
              readOnly={true}
              className={`${styles.inputBox} w-full`}
              placeholder="알뜰폰 통신사 선택"
              value={alddleTelecom}
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
                <h3 className={`text-[24px] font-bold text-[#2a3037]`}>
                  알뜰폰 통신사 선택
                </h3>
                <div className={'grid grid-cols-3 gap-4 py-[8px]'}>
                  {selectedAlttleMang.map((item) => (
                    <div
                      key={item.title}
                      className={`${styles.bottomSheetList2}`}
                      onClick={() => {
                        setBottomSheetOpen(false);
                        setAlddleTelecom(item.title);
                      }}
                    >
                      <p
                        className={
                          'mt-2 text-center text-[14px] text-[#495057]'
                        }
                      >
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </BottomSheet>
          </div>
        ) : null}

        <div className={`${styles.usimSubTitle} mt-6`}>휴대폰 번호</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="휴대폰 번호"
          maxLength={13}
          value={phoneNumber}
          type="text"
          onChange={(e) => {
            const inputed = e.target.value
              .replace(/[^0-9]/g, '')
              .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            setPhoneNumber(inputed);
          }}
        />
        <button
          disabled={
            selectedTelecom?.telecomName === '' || phoneNumber.length !== 13
          }
          onClick={() => {
            setTotal({
              ...total,
              selectedTelecom: selectedTelecom.telecomName,
              alddleTelecom,
              phoneNumber,
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

export default S5MobileInfo;
