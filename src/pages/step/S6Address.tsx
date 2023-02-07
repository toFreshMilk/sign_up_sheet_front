import { useRouter } from 'next/router';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';

const S6Address = () => {
  const router = useRouter();
  const [bunji, setBunji] = useState('');
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  return (
    <Main>
      {openPostcode && (
        <div className={`${styles.positionFixed} top-[72px]`}>
          <div className="flex items-center justify-between p-[20px] border-b border-gray-300">
            <div className="text-20 font-bold text-gray-700">주소 찾기</div>
            <div
              className="text-gray-500 hover:text-gray-600 cursor-pointer"
              onClick={() => {
                setOpenPostcode(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className={'w-[24px]'}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 5l14 14M19 5L5 19"
                ></path>
              </svg>
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
          유심 배송을 받을 <br /> 주소를 입력해 주세요
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
            sessionStorage.setItem(
              'S6Address',
              JSON.stringify({
                bunji,
                address1,
                address2,
              })
            );
            router.push('./S6Address');
          }}
          className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S6Address;