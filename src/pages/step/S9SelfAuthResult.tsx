import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { Context } from '@/utils/Context';

const S9SelfAuthResult = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const checkAuth = async () => {
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/checkIdentification`;
    const passedIdentification = await axios.post(tokenUrl, {
      mTxId: total.mTxId,
      userName: total.userName,
      jumin1: total.jumin1,
    });
    if (passedIdentification.data.length > 0) {
      const result = passedIdentification.data[0];
      setTotal({
        ...total,
        selfAuthType: result.type || '',
      });
      await router.push('./S10BillStyle');
    } else {
      // eslint-disable-next-line no-alert
      alert('입력한 정보와 인증한 정보가 일치하지 않습니다.');
      await router.push('./S8Identification');
    }
  };
  useEffect(() => {
    console.log(total);
    checkAuth();
  }, []);
  return <></>;
};

export default S9SelfAuthResult;
