import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Main } from '@/templates/Main';

const S12JoinResult = () => {
  const router = useRouter();

  const [totalData, setTotalData] = useState({}) as any;
  const [payFeeObj, setPayFeeObj] = useState({
    RATECD: '요금제 정보 없음',
    RATENM: '요금제 정보 없음',
    RATEAMT: '-',
  }) as any;
  const [ftpImgUrls, setFtpImgUrls] = useState<string[]>([]);
  const [identificationRst, setIdentificationRst] = useState(false);
  const collectFtpUrls = (_keys: any) => {
    const aaa = [
      _keys?.ftpImgUrl1?.usimImg,
      _keys?.ftpImgUrl2?.usimImg,
      _keys?.ftpImgUrl3?.usimImg,
      _keys?.ftpImgUrl4?.usimImg,
      _keys?.ftpImgUrl5?.usimImg,
    ];
    aaa.forEach((d: string) => {
      if (d !== undefined) {
        ftpImgUrls.push(d);
      }
    });
    // console.log(ftpImgUrls);
    setFtpImgUrls(ftpImgUrls);
  };
  const inicisKcb = async (_obj: any) => {
    const { S5Identification } = _obj;
    // console.log(S5Identification);

    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/checkIdentification`;
    const passedIdentification = await axios.post(tokenUrl, {
      mTxId: S5Identification?.mTxId,
      userName: S5Identification?.userName,
      jumin1: S5Identification?.jumin1,
    });
    // console.log(passedIdentification.data);
    // console.log('passedIdentification.data');
    // console.log(passedIdentification.data.length);
    if (passedIdentification.data.length > 0) {
      setIdentificationRst(true);
    }
  };
  const finalRow = async () => {
    // 여기서 finalRow
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/insertFinalRow`;
    const resultObj = await axios.post(tokenUrl, {
      ...totalData,
      payFeeObj,
      ftpImgUrls,
    });
    // console.log('resultObj');
    // console.log(resultObj);
    if (resultObj.data.rowsAffected > 0) {
      const s0 = sessionStorage.getItem('S0FeeId');
      sessionStorage.clear();
      sessionStorage.setItem('S0FeeId', JSON.stringify(s0));
      // eslint-disable-next-line no-alert
      alert('접수가 완료되었습니다.');
      await router.push('/');
    } else {
      // eslint-disable-next-line no-alert
      alert('접수가 되지 않았습니다. 나중에 다시 시도해주세요.');
    }
  };
  useEffect(() => {
    const ff = {} as any;
    Object.keys(sessionStorage).forEach((key) => {
      ff[key] = JSON.parse(sessionStorage.getItem(key) || '');
    });
    setTotalData(ff);
    collectFtpUrls(ff);
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/getPayFeeInfo`;
    axios
      .post(tokenUrl, { id: ff.S0FeeId?.feeId })
      .then((res) => {
        // console.log(res.data);
        if (res.data.length === 0) {
          throw new Error('요금제 없음');
        } else {
          setPayFeeObj(...res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    inicisKcb(ff);
  }, []);
  return (
    <Main>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-lg font-medium leading-6 text-gray-900">
            신청내역에 대하여 모든 내용을 확인 및 동의합니다.
          </h1>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-bold text-gray-700">가입정보</dt>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">가입유형</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S1UserType?.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">요금제</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {payFeeObj.RATENM}
              </dd>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">납부 금액</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {payFeeObj.RATEAMT} 원
              </dd>
            </div>

            <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-bold text-gray-700">고객 구분</dt>
            </div>
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                명의 고객 이름
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S5Identification?.userName}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                명의고객 생년월일
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S5Identification?.jumin1}
              </dd>
            </div>
            {totalData.S3JoinType?.joinType === '신규가입' ? (
              <>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-bold text-gray-700">
                    신규희망번호
                  </dt>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    희망번호1
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {totalData.S8HopeNumber?.hope1}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    희망번호2
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {totalData.S8HopeNumber?.hope2}
                  </dd>
                </div>
              </>
            ) : (
              <>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-bold text-gray-700">
                    번호 이동 정보
                  </dt>
                </div>
                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    번호이동 휴대폰 번호
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {totalData.S6UbuniInfo?.MOVE_HP}
                  </dd>
                </div>
              </>
            )}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-bold text-gray-700">요금납부정보</dt>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                연락가능번호
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S9ContactableNumber?.possiblePhoneNumber}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">이메일</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S5Identification?.email1}
                {totalData.S5Identification?.email2}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">주소</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S10InputAddress?.receiveAddress1}
                {totalData.S10InputAddress?.receiveAddress2}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">청구서 유형</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S10InputAddress?.chungGuType?.title}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                자동납부종류
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S11PayFeeMethod?.payFeeMethodType?.title}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">예금주</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S11PayFeeMethod?.accountName}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">관계</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {totalData.S11PayFeeMethod?.relation}
              </dd>
            </div>
          </dl>
        </div>
        <div className="px-4 py-3 sm:px-6">
          <button
            onClick={async () => {
              if (identificationRst) {
                await finalRow();
              } else {
                // eslint-disable-next-line no-alert
                alert('본인인증 정보가 일치하지 않습니다.');
              }
            }}
            className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
          >
            확인
          </button>
        </div>
      </div>
    </Main>
  );
};

export default S12JoinResult;