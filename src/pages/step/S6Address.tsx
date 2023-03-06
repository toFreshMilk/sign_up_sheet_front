import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { Close } from '@/utils/Svgs';

const S6Address = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [bunji, setBunji] = useState('');
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  return (
    <Main>
      {openPostcode && (
        <div className={`${styles.positionFixed}`}>
          <div className="flex items-center justify-between border-b border-gray-300 p-[20px]">
            <div className="text-[20px] font-bold text-gray-700">주소 찾기</div>
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
        <h2 className={`${styles.stepTitle}`}>
          유심 배송 받을 <br /> 주소를 입력해 주세요
        </h2>
        <br className={'mt-[32px]'} />
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
          placeholder=""
          value={address1}
          onChange={() => {}}
          type="text"
        />
        <input
          className={`${styles.inputBox} w-full`}
          placeholder=""
          value={address2}
          onChange={(e) => {
            setAddress2(e.target.value);
          }}
          type="text"
        />
        <button
          disabled={bunji === '' || address1 === '' || address2 === ''}
          onClick={() => {
            setTotal({
              ...total,
              bunji,
              address1,
              address2,
            });
            router.push('./S7Email');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S6Address;
