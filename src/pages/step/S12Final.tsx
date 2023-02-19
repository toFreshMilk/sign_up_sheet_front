import 'react-tooltip/dist/react-tooltip.css';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const nowPaymentList = [
  {
    value: '계좌 자동이체',
    label: '계좌 자동이체',
    rating: 'safe',
  },
  {
    value: '카드',
    label: '카드',
    rating: 'safe',
  },
  {
    value: '지로',
    label: '지로',
    rating: 'safe',
  },
];
const S12Final = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [nowPayment, setNowPayment] = useState('');
  const [showSelect1, setShowSelect1] = useState(false);
  const finalRow = async () => {
    // 여기서 finalRow
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/insertFinalRow`;
    const resultObj = await axios.post(tokenUrl, {
      ...total,
    });
    if (resultObj.data.rowsAffected > 0) {
      // eslint-disable-next-line no-alert
      alert('접수가 완료되었습니다.');
      router.push('/');
    } else {
      // eslint-disable-next-line no-alert
      alert('접수가 되지 않았습니다. 나중에 다시 시도해주세요.');
    }
  };
  const getFeeInfo = async (_feeId: string) => {
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/getPayFeeInfo`;
    const resultObj = await axios.post(tokenUrl, {
      id: _feeId,
    });
    const result = resultObj.data[0];
    if (result) {
      setTotal({
        ...total,
        rateName: result.RATENM,
        rateAmt: result.RATEAMT,
      });
    } else {
      setTotal({
        ...total,
        rateName: '요금제 정보 없음',
        rateAmt: '0',
      });
    }
  };
  useEffect(() => {
    console.log(total);
    getFeeInfo(total.feeId);
    setShowSelect1(true);
  }, []);
  return (
    <Main>
      <div>
        <h2 className={`${styles.stepTitle}`}>
          현재 요금 납부 방법을 <br /> 선택해 주세요
        </h2>
        <h3 className="mt-[8px] text-[16px] text-[#868e96]">
          현재 번호를 그대로 쓰기 위한 추가 인증 정보에요
        </h3>
        <br className={'mt-[32px]'} />
        <div className={'relative mr-[20px] w-full'}>
          {showSelect1 ? (
            <Select
              options={nowPaymentList}
              defaultValue={{
                value: '현재 납부 방법을 선택해 주세요',
                label: '현재 납부 방법을 선택해 주세요',
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
                setNowPayment(v.label);
                setTotal({
                  ...total,
                  nowPaymentInfo: v.label,
                });
              }}
            />
          ) : null}
        </div>
        <button
          disabled={nowPayment === ''}
          onClick={async () => {
            await finalRow();
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          신청완료
        </button>
      </div>
    </Main>
  );
};

export default S12Final;
