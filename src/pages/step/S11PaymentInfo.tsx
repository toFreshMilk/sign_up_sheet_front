import 'react-tooltip/dist/react-tooltip.css';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Select from 'react-select';
import { BottomSheet } from 'react-spring-bottom-sheet';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { bankList, family, monthList, yearList } from '@/utils/PublicData';
import { Close, InformBlue } from '@/utils/Svgs';

const S11PaymentInfo = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [who, setWho] = useState('');
  const [card1, setCard1] = useState('');
  const [card2, setCard2] = useState('');
  const [card3, setCard3] = useState('');
  const [card4, setCard4] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
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
  const [showSelect1, setShowSelect1] = useState(false);
  const [showSelect2, setShowSelect2] = useState(false);
  const [showSelect3, setShowSelect3] = useState(false);
  const [isNotMyThing, setIsNotMyThing] = useState(false);
  const [whatsRelationForNMT, setWhatsRelationForNMT] = useState('');
  const [ownerNameForNMT, setOwnerNameForNMT] = useState('');
  const [birthMonthDayForNMT, setBirthMonthDayForNMT] = useState('');
  const [contactableMobileForNMT, setContactableMobileForNMT] =
    useState('010-');
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState({
    name: '',
    value: '',
    disabled: false,
  });
  const [accountNumber, setAccountNumber] = useState('');
  const ref2 = useRef(null) as any;
  const ref3 = useRef(null) as any;
  const ref4 = useRef(null) as any;
  const [phoneNumberPayFor, setPhoneNumberPayFor] = useState('');
  const [bunji, setBunji] = useState('');
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [email, setEmail] = useState('');
  // const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/; 이메일
  const checkAccountInfoFunc = async () => {
    const checkUrl = `${process.env.NEXT_PUBLIC_API_URL}/checkAccountInfoFunc`;
    const result = await axios.post(checkUrl, {
      accountName: isNotMyThing ? ownerNameForNMT : total.userName,
      accountJumin1: isNotMyThing ? birthMonthDayForNMT : total.jumin1,
      bankCd: selectedBank.value,
      accountNumber,
      acctGb: '1',
    });
    console.log(result);
    console.log(result.data.dataHeader.GW_RSLT_CD);

    return result.data.dataHeader.GW_RSLT_CD === '1200';
  };
  useEffect(() => {
    setWho(total.S5PersonalInfo?.userName);
    setShowSelect1(true);
    setShowSelect2(true);
    setShowSelect3(true);
  }, []);
  return (
    <Main>
      <div className={``}>
        <h2 className={`${styles.stepTitle}`}>요금 납부 정보</h2>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle} mt-6`}>휴대폰 번호</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="휴대폰 번호"
          autoFocus={true}
          maxLength={13}
          value={phoneNumberPayFor}
          type="text"
          onChange={(e) => {
            const inputed = e.target.value
              .replace(/[^0-9]/g, '')
              .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            setPhoneNumberPayFor(inputed);
          }}
        />
        <br className={'mt-[32px]'} />
        {openPostcode && (
          <div className={`${styles.positionFixed}`}>
            <div className="flex items-center justify-between border-b border-gray-300 p-[20px]">
              <div className="text-[20px] font-bold text-gray-700">
                주소 찾기
              </div>
              <div
                className="cursor-pointer text-gray-500 hover:text-gray-600"
                onClick={() => {
                  setOpenPostcode(false);
                }}
              >
                <Close />
              </div>
            </div>
            <DaumPostcode
              onComplete={(data) => {
                setBunji(data.zonecode);
                setAddress1(data.roadAddress);
                setOpenPostcode(false);
              }}
              autoClose={false}
              defaultQuery=""
            />
          </div>
        )}
        <div className={``}>
          <div className={`${styles.usimSubTitle}`}>주소</div>
          <div className={'flex'}>
            <input
              className={`${styles.inputBox} w-full`}
              placeholder="주소를 입력해 주세요"
              value={bunji}
              onChange={() => {}}
              type="text"
            />
            <button
              className={`${styles.addressSearch} ml-[20px]`}
              onClick={() => {
                setOpenPostcode(true);
              }}
            >
              주소 검색
            </button>
          </div>
          <input
            className={`${styles.inputBox} w-full`}
            value={address1}
            onChange={() => {}}
            type="text"
          />
          <input
            className={`${styles.inputBox} w-full`}
            placeholder="상세주소"
            value={address2}
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
            type="text"
          />
        </div>
        <br className={'mt-[32px]'} />
        <div className={``}>
          <div className={`${styles.usimSubTitle}`}>이메일</div>
          <input
            className={`${styles.inputBox} w-full`}
            placeholder="smartel@smartel.co.kr"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
          />
        </div>
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
            <div className={`${styles.usimSubTitle}`}>카드 번호</div>
            <div className={'flex justify-items-center'}>
              <input
                className={`${styles.inputBox} w-full`}
                value={card1}
                maxLength={4}
                onChange={(e) => {
                  const inputed = e.target.value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                  setCard1(inputed);
                }}
                type="text"
              />
              <div className={`${styles.hipen}`}>-</div>
              <input
                ref={ref2}
                className={`${styles.inputBox} w-full`}
                value={card2}
                maxLength={4}
                onChange={(e) => {
                  const inputed = e.target.value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                  setCard2(inputed);
                }}
                type="text"
              />
              <div className={`${styles.hipen}`}>-</div>
              <input
                ref={ref3}
                className={`${styles.inputBox} w-full`}
                value={card3}
                maxLength={4}
                onChange={(e) => {
                  const inputed = e.target.value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                  setCard3(inputed);
                }}
                type="text"
              />
              <div className={`${styles.hipen}`}>-</div>
              <input
                ref={ref4}
                className={`${styles.inputBox} w-full`}
                value={card4}
                maxLength={4}
                onChange={(e) => {
                  const inputed = e.target.value
                    .replace(/[^0-9]/g, '')
                    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                  setCard4(inputed);
                }}
                type="text"
              />
            </div>
            <br className={'mt-[32px]'} />
            <div className={`${styles.usimSubTitle}`}>유효 기간</div>
            <div className={'flex justify-items-center'}>
              <div className={'relative mr-[20px] w-1/4'}>
                {showSelect1 ? (
                  <Select
                    options={monthList}
                    defaultValue={{
                      value: '월',
                      label: '월',
                      rating: 'safe',
                    }}
                    classNamePrefix={'selectPrefix'}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={false}
                    name={'dd'}
                    onChange={(v: any) => {
                      setMonth(v.label);
                    }}
                  />
                ) : null}
              </div>
              <div className={'relative w-2/5'}>
                {showSelect2 ? (
                  <Select
                    options={yearList}
                    defaultValue={{
                      value: '년',
                      label: '년',
                      rating: 'safe',
                    }}
                    classNamePrefix={'selectPrefix'}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={false}
                    name={'dd'}
                    onChange={(v: any) => {
                      setYear(v.label);
                    }}
                  />
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={`${styles.usimSubTitle}`}>은행</div>
            <input
              readOnly={true}
              className={`${styles.inputBox} w-full`}
              placeholder="은행 선택"
              value={selectedBank?.name}
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
                  은행 선택
                </h3>
                <div className={'grid grid-cols-3 gap-4 py-[8px]'}>
                  {bankList.map((item, i1) => (
                    <div
                      key={item.name}
                      className={`${styles.bottomSheetList2}`}
                      onClick={() => {
                        bankList.map((item2: any, i2: number) => {
                          const temp = item2;
                          temp.selected = i1 === i2;
                          return temp;
                        });
                        setBottomSheetOpen(false);
                        setSelectedBank(item);
                      }}
                    >
                      <img
                        src={`${router.basePath}/assets/images/banks/${item.imgName}.svg`}
                        alt={item.imgName}
                        className="h-[50px] w-[50px] shrink-0 py-[8px]"
                      />
                      <p
                        className={
                          'mt-2 text-center text-[14px] text-[#495057]'
                        }
                      >
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </BottomSheet>
            <br className={'mt-[32px]'} />
            <div className={`${styles.usimSubTitle}`}>계좌번호</div>
            <input
              className={`${styles.inputBox} w-full`}
              placeholder="숫자만 입력해주세요"
              value={accountNumber}
              type="text"
              onChange={(e) => {
                const inputed = e.target.value.replace(/[^0-9]/g, '');
                setAccountNumber(inputed);
              }}
            />
          </>
        )}
        <br className={'mt-[32px]'} />
        <div className="flex items-start">
          <div className="flex h-7 items-center">
            <input
              name={`inNotMyThing`}
              type="checkbox"
              checked={isNotMyThing}
              className={`${styles.checkBoxStyle} h-[20px] w-[20px]`}
              onChange={() => {}}
              onClick={() => {
                setIsNotMyThing(!isNotMyThing);
              }}
            />
          </div>
          <div className="ml-[8px]">
            <label
              htmlFor={`inNotMyThing`}
              className="align-text-top text-[16px] font-medium text-gray-700"
              onClick={() => {
                setIsNotMyThing(!isNotMyThing);
              }}
            >
              제 명의의 {paymentType[0]?.checked ? '카드' : '계좌'}가 아니에요
            </label>
          </div>
        </div>
        {isNotMyThing ? (
          <>
            <div className={`${styles.usimSubTitle} mt-10`}>
              {who}님과의 관계
            </div>
            {showSelect3 ? (
              <Select
                options={family}
                defaultValue={{
                  value: '선택해주세요',
                  label: '선택해주세요',
                  rating: 'safe',
                }}
                classNamePrefix={'selectPrefix'}
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isRtl={false}
                isSearchable={false}
                name={'dd'}
                onChange={(v: any) => {
                  setWhatsRelationForNMT(v.label);
                }}
              />
            ) : null}
            <div className={`${styles.usimSubTitle} mt-10`}>
              {paymentType[0]?.checked ? '카드' : '계좌'} 소유자 이름
            </div>
            <input
              className={`${styles.inputBox} w-full`}
              placeholder="이름을 입력해주세요"
              value={ownerNameForNMT}
              type="text"
              onChange={(e) => {
                setOwnerNameForNMT(e.target.value);
              }}
            />
            <div className={`${styles.usimSubTitle} mt-10`}>생년월일</div>
            <input
              className={`${styles.inputBox} w-full`}
              placeholder="예) 901231"
              value={birthMonthDayForNMT}
              type="text"
              onChange={(e) => {
                setBirthMonthDayForNMT(e.target.value);
              }}
            />
            <div className={`${styles.usimSubTitle} mt-10`}>
              연락 가능한 번호
            </div>
            <input
              className={`${styles.inputBox} w-full`}
              value={contactableMobileForNMT}
              type="text"
              onChange={(e) => {
                const inputed = e.target.value
                  .replace(/[^0-9]/g, '')
                  .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                setContactableMobileForNMT(inputed);
              }}
            />
            <div className="mt-[24px]">
              <div className={`${styles.informBlue}`}>
                <InformBlue />
                가족 명의의 {paymentType[0]?.checked ? '카드' : '계좌'}만
                가능해요
              </div>
            </div>
          </>
        ) : null}
        <button
          disabled={false}
          onClick={async () => {
            const ownerName = isNotMyThing ? ownerNameForNMT : total.userName;
            const ownerResidentNumber = isNotMyThing
              ? birthMonthDayForNMT
              : total.jumin12;
            const ownerRelation = isNotMyThing ? whatsRelationForNMT : '본인';
            const isPassedAccount = await checkAccountInfoFunc();
            if (isPassedAccount) {
              setTotal({
                ...total,
                phoneNumberPayFor,
                bunji,
                address1,
                address2,
                email,
                card1234: card1 + card2 + card3 + card4,
                selectedBank: selectedBank.name,
                bankCd: selectedBank.value,
                accountNumber,
                month,
                year,
                ownerResidentNumber,
                ownerName,
                ownerRelation,
                isNotMyThing,
                whatsRelationForNMT,
                ownerNameForNMT,
                birthMonthDayForNMT,
                contactableMobileForNMT,
              });
              router.push('./S12Final');
            } else {
              // eslint-disable-next-line no-alert
              alert('계좌 확인이 되지 않았습니다.');
            }
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S11PaymentInfo;
