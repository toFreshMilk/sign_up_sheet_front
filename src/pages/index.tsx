import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const Index = () => {
  const router = useRouter();
  const { setTotal } = useContext(Context) as any;
  useEffect(() => {
    const asPath = router.asPath || '';
    const feeId = asPath.split('=')[1] || 'LPZ0015470';
    // console.log(feeId);
    const defineTotal = {
      custommerType: '',
      custommerTypeTitle: '',
      marketing1: false,
      marketing2: false,
      joinType: '',
      needUsimType: '',
      modelName: '',
      capacity: '',
      serial: '',
      factory: '',
      eid: '',
      imei: '',
      imei2: '',
      howToGetUsim: '',
      aldyOwnUsimModel: '',
      aldyOwnUsimNumber: '',
      selectedTelecom: '',
      alddleTelecom: '',
      phoneNumber: '',
      userName: '',
      jumin12: '',
      jumin1: '',
      userNameParent: '',
      jumin34: '',
      jumin3: '',
      bunji: '',
      address1: '',
      address2: '',
      email: '',
      identificationType: '',
      monthYear: '',
      driverNumber: '',
      billType: '',
      card1234: '',
      selectedBank: '',
      accountNumber: '',
      month: '',
      year: '',
      isNotMyThing: '',
      whatsRelationForNMT: '',
      ownerNameForNMT: '',
      birthMonthDayForNMT: '',
      contactableMobileForNMT: '',
      nowPaymentInfo: '',
    };
    setTotal({ feeId, ...defineTotal });
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
