import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    const asPath = router.asPath || '';
    const feeId = asPath.split('=')[1];
    sessionStorage.setItem('S0FeeId', JSON.stringify({ feeId }));
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
