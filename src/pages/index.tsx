import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    // 요금제 아이디 저장하고 이동
    // console.log(router.asPath);
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
