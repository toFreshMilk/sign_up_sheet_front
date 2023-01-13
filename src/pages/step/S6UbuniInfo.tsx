import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';
import { alttleTelecomList } from '@/utils/PublicData';

const telecomList = [
  { title: 'SKT', checked: true },
  { title: 'KT', checked: false },
  { title: 'LGT', checked: false },
  { title: '알뜰폰', checked: false },
];
const buniInfoList = [
  { title: '단말기 일련번호', checked: true },
  { title: '신용카드 번호', checked: false },
  { title: '요금납부 은행계좌', checked: false },
  { title: '지로납부', checked: false },
];
const S6UbuniInfo = () => {
  const router = useRouter();
  const [telecomBuini, setTelecomBuini] = useState(telecomList[0]?.title);
  const [alttleTelecom, setAlttleTelecom] = useState('');
  const [userInfo, setUserInfo] = useState({
    movePhoneNumber: '',
    digit4Number: '',
  });
  const [buniInfo, setBuniInfo] = useState(buniInfoList[0]?.title);

  const handleInputChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <h2 className="flex justify-center py-10 text-3xl font-bold p-3">
          번호이동 정보를 입력해주세요
        </h2>
        <div className="col-span-6 sm:col-span-4 mb-5">
          <label
            htmlFor="selectedTelecom"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            번호이동 할 통신사 선택
          </label>
          <select
            name="selectedTelecom"
            value={telecomBuini}
            onChange={(e) => {
              setTelecomBuini(e.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:outline-none sm:text-sm"
          >
            {telecomList.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {telecomBuini === '알뜰폰' && (
          <div className="col-span-6 sm:col-span-4 mb-5">
            <label
              htmlFor="selectedTelecom"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              알뜰폰 통신사 선택
            </label>
            <select
              name="selectedTelecom"
              value={alttleTelecom}
              onChange={(e) => {
                setAlttleTelecom(e.target.value);
              }}
              className="block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:outline-none sm:text-sm"
            >
              {alttleTelecomList.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="col-span-6 sm:col-span-4 mb-5">
          <label
            htmlFor="movePhoneNumber"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            번호이동 할 핸드폰 번호
          </label>
          <input
            type="text"
            name="movePhoneNumber"
            onChange={handleInputChange}
            value={userInfo.movePhoneNumber}
            className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
          />
        </div>
        <div className="col-span-6 sm:col-span-4">
          <label
            htmlFor="buniInfo"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            번호이동 신청정보
          </label>
          <select
            name="buniInfo"
            value={buniInfo}
            onChange={(e) => {
              setBuniInfo(e.target.value);
            }}
            className="block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:outline-none sm:text-sm"
          >
            {buniInfoList.map((item) => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          {buniInfo !== '지로납부' && (
            <div className="col-span-6 sm:col-span-4 mt-3">
              <input
                type="text"
                name="digit4Number"
                placeholder="뒷 번호 4자리"
                onChange={handleInputChange}
                value={userInfo.digit4Number}
                className="p-3 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <button
          onClick={() => {
            sessionStorage.setItem(
              'S6UbuniInfo',
              JSON.stringify({
                MOVE_HP: userInfo.movePhoneNumber,
                MOVE_TELECOM: telecomBuini,
                MOVE_TELECOM_SUB: alttleTelecom,
                MOVE_CERT: buniInfo,
                MOVE_CERT_NUMBER: userInfo.digit4Number,
              })
            );
            const S3JoinType = sessionStorage.getItem('S3JoinType') || '';
            const S3JoinTypeJson = JSON.parse(S3JoinType);
            if (S3JoinTypeJson.joinType === '신규가입') {
              router.push('./S8HopeNumber');
            } else {
              router.push('./S9ContactableNumber');
            }
          }}
          className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S6UbuniInfo;
