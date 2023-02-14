import { useRouter } from 'next/router';

import styles from '@/styles/utils.module.css';

const BottomNavBtn = ({ setShowDetailInfo }: any) => {
  return (
    <>
      <button className={`${styles.nextBtn} mt-[40px] mb-[16px]`}>
        인증하러 가기
      </button>
      <button
        className={`${styles.closeBtn}`}
        onClick={() => {
          setShowDetailInfo(false);
        }}
      >
        닫기
      </button>
    </>
  );
};
const NaverDetail = ({ setShowDetailInfo }: any) => {
  const router = useRouter();
  return (
    <div className={`${styles.authDetailwrapper}`}>
      <div>
        <h1 className="m-0 mb-[40px] p-0 text-[24px] font-bold leading-[1.5] text-[#000]">
          <span className={'text-[#08be35]'}>네이버</span> 인증 전<br />
          꼭! 확인해 주세요
        </h1>
        <div className="flex flex-col gap-[54px]">
          <div className="flex items-center gap-[16px]">
            <img
              src={`${router.basePath}/assets/images/ico-cert-guide-naver-1.svg`}
              alt="ico-cert-guide-naver-1"
              width="80"
              height="80"
              className="shrink-0"
            />
            <div>
              <div className="mb-[2px] text-[18px] font-bold text-[#000]">
                최신 네이버 앱이 필요해요
              </div>
              <div className="text-[14px] leading-[1.5] text-gray-500">
                인증 시 로그인한 ID와
                <strong className="font-bold">
                  동일한 ID로 네이버 앱에 로그인
                </strong>
                중인지 확인해 주세요
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <img
              src={`${router.basePath}/assets/images/ico-cert-guide-naver-2.svg`}
              alt="ico-cert-guide-naver-2"
              width="80"
              height="80"
              className="shrink-0"
            />
            <div>
              <div className="mb-[2px] text-[18px] font-bold text-[#000]">
                앱 알림이 켜져 있나요?
              </div>
              <div className="text-[14px] leading-[1.5] text-gray-500">
                알림이 오지 않는다면 네이버 앱을 켜서 오른쪽
                <strong className="font-bold">상단에 종 모양</strong>을 클릭해요
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <img
              src={`${router.basePath}/assets/images/ico-cert-guide-naver-3.svg`}
              alt="ico-cert-guide-naver-3"
              width="80"
              height="80"
              className="shrink-0"
            />
            <div>
              <div className="mb-[2px] text-[18px] font-bold text-[#000]">
                신청하는 분의 인증서인가요?
              </div>
              <div className="text-[14px] leading-[1.5] text-gray-500">
                신청하려는 분과{' '}
                <strong className="font-bold">
                  동일한 명의의 네이버 인증서
                </strong>
                필요해요
              </div>
            </div>
          </div>
        </div>
        <BottomNavBtn setShowDetailInfo={setShowDetailInfo} />
      </div>
    </div>
  );
};
const TossDetail = ({ setShowDetailInfo }: any) => {
  const router = useRouter();
  return (
    <div className={`${styles.authDetailwrapper}`}>
      <div>
        <h1 className="m-0 mb-[40px] p-0 text-[24px] font-bold leading-[1.5] text-[#000]">
          <span className={'text-[#0166ff]'}>토스</span> 인증 전<br />
          꼭! 확인해 주세요
        </h1>
        <div className="flex flex-col gap-[54px]">
          <div className="flex items-center gap-[16px]">
            <img
              src={`${router.basePath}/assets/images/ico-cert-guide-toss-1.svg`}
              alt="ico-cert-guide-toss-1"
              width="80"
              height="80"
              className="shrink-0"
            />
            <div>
              <div className="mb-[2px] text-[18px] font-bold text-[#000]">
                토스 인증서가 필요해요
              </div>
              <div className="text-[14px] leading-[1.5] text-gray-500">
                최신 토스 앱을 다운 받아
                <strong className="font-bold"> 토스 인증서</strong>를 발급
                받아주세요
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <img
              src={`${router.basePath}/assets/images/ico-cert-guide-toss-2.svg`}
              alt="ico-cert-guide-toss-2"
              width="80"
              height="80"
              className="shrink-0"
            />
            <div>
              <div className="mb-[2px] text-[18px] font-bold text-[#000]">
                앱 알림이 켜져 있나요?
              </div>
              <div className="text-[14px] leading-[1.5] text-gray-500">
                알림이 오지 않는다면 토스 앱을 켜서 오른쪽
                <strong className="font-bold">상단에 종 모양</strong>을 클릭해요
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[16px]">
            <img
              src={`${router.basePath}/assets/images/ico-cert-guide-toss-3.svg`}
              alt="ico-cert-guide-toss-3"
              width="80"
              height="80"
              className="shrink-0"
            />
            <div>
              <div className="mb-[2px] text-[18px] font-bold text-[#000]">
                신청하는 분의 인증서인가요?
              </div>
              <div className="text-[14px] leading-[1.5] text-gray-500">
                신청하려는 분과{' '}
                <strong className="font-bold">동일한 명의의 토스 인증서</strong>
                필요해요
              </div>
            </div>
          </div>
        </div>
        <BottomNavBtn setShowDetailInfo={setShowDetailInfo} />
      </div>
    </div>
  );
};

const CreditDetail = ({ setShowDetailInfo }: any) => {
  const router = useRouter();
  return (
    <div className={`${styles.authDetailwrapper}`}>
      <div>
        <h1 className="m-0 mb-[40px] p-0 text-[24px] font-bold leading-[1.5] text-[#000]">
          <span className={'text-[#f1b01d]'}>신용카드</span> 인증 전<br />
          꼭! 확인해 주세요
        </h1>
        <div className="flex flex-col gap-[54px]">
          <div className="flex items-center gap-[16px]">
            <img
              src={`${router.basePath}/assets/images/ico-cert-guide-card-1.svg`}
              alt="ico-cert-guide-card-1"
              width="80"
              height="80"
              className="shrink-0"
            />
            <div>
              <div className="mb-[2px] text-[18px] font-bold text-[#000]">
                신청하는 분의 신용카드인가요?
              </div>
              <div className="text-[14px] leading-[1.5] text-gray-500">
                신청하려는 분과
                <strong className="font-bold"> 동일한 명의의 신용카드를</strong>
                를 준비해주세요
              </div>
            </div>
          </div>
        </div>
        <BottomNavBtn setShowDetailInfo={setShowDetailInfo} />
      </div>
    </div>
  );
};

export { NaverDetail, TossDetail, CreditDetail };
