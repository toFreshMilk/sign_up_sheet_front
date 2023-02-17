import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { initialState } from '@/utils/PublicData';

const Index = () => {
  const router = useRouter();
  const { setTotal } = useContext(Context) as any;
  useEffect(() => {
    const asPath = router.asPath || '';
    const feeId = asPath.split('=')[1] || 'LPZ0015470';
    // console.log(feeId);
    setTotal({ ...initialState, feeId });
    router.push('/step/S1UserType');
  }, []);

  return (
    <Main
      meta={
        <Meta
          title={`Smartel 온라인 가입 신청서`}
          description="smartel 온라인 가입 신청서 메인"
        />
      }
    >
      <div></div>
    </Main>
  );
};

export default Index;
