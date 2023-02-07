import { RadioGroup } from '@headlessui/react';
import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import S5Identification2 from '@/pages/step/S5Identification2';
import S5Identification3KCB from '@/pages/step/S5Identification3KCB';
import { Main } from '@/templates/Main';
import { CheckIcon, FtpImgModal } from '@/utils/Commons';
import { driverLicenceRegion } from '@/utils/PublicData';

const identificationTypes = [
  { title: '주민등록증', checked: true },
  { title: '운전면허증', checked: false },
];
const emailList = [
  { title: '직접입력', checked: true },
  { title: 'naver.com', checked: true },
  { title: 'gmail.com', checked: true },
  { title: 'nate.com', checked: true },
  { title: 'hanmil.net', checked: true },
];

const S5PhoneNumber = () => {
  const router = useRouter();
  const [identification, setIdentification] = useState(identificationTypes[0]);

  const [keys, setKeys] = useState({
    mid: 'THsmartel1',
    apiKey: '633913a75f7695f861b0ff0a2363515f',
    mTxId: '',
    reqSvcCd: '02',
    authHash: '',
  });

  const [person, setPerson] = useState({
    userName: process.env.NEXT_PUBLIC_NAME || '',
    userNameP: process.env.NEXT_PUBLIC_NAME || '',
    email1: '',
    email2: '',
    email3: emailList[0]?.title,
    totalEmail: '',
    publishedDate: '',
    jumin1: process.env.NEXT_PUBLIC_jumin1 || '',
    jumin2: process.env.NEXT_PUBLIC_jumin2 || '',
    jumin3: process.env.NEXT_PUBLIC_jumin3 || '',
    jumin4: process.env.NEXT_PUBLIC_jumin4 || '',
    driverLicenseNumber1: '11',
    driverLicenseNumber2: '',
    driverLicenseNumber3: '',
    driverLicenseNumber4: '',
    isForgn: '',
  });
  const [picAttOpenFtp1, setPicAttOpenFtp1] = useState(false);
  const [uploadImg1, setUploadImg1] = useState<File>();
  const closeModalForFtp1 = () => {
    setPicAttOpenFtp1(false);
  };
  const [picAttOpenFtp2, setPicAttOpenFtp2] = useState(false);
  const [uploadImg2, setUploadImg2] = useState<File>();
  const closeModalForFtp2 = () => {
    setPicAttOpenFtp2(false);
  };
  const [picAttOpenFtp3, setPicAttOpenFtp3] = useState(false);
  const [uploadImg3, setUploadImg3] = useState<File>();
  const closeModalForFtp3 = () => {
    setPicAttOpenFtp3(false);
  };
  const [picAttOpenFtp4, setPicAttOpenFtp4] = useState(false);
  const [uploadImg4, setUploadImg4] = useState<File>();
  const closeModalForFtp4 = () => {
    setPicAttOpenFtp4(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value.trim() });
  };
  const handleInputChangeForEmail2 = (e: any) => {
    const { name, value } = e.target;
    setPerson({
      ...person,
      [name]: value,
      totalEmail: `${person.email1}@${value}`,
    });
  };
  const handleInputChangeForEmail3 = (e: any) => {
    const { name, value } = e.target;
    setPerson({
      ...person,
      [name]: value,
      email2: value === '직접입력' ? '' : value,
      totalEmail:
        value === '직접입력' ? person.email1 : `${person.email1}@${value}`,
    });
  };
  const identificationCheckLG = async () => {
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/getCM806`;
    let inqDvCd = '';
    if (identification?.title === '주민등록증') {
      inqDvCd = 'REGID';
    } else {
      inqDvCd = 'DRIVE';
    }
    if (person.isForgn === '외국인') {
      inqDvCd = 'FORGN';
    }
    let persFrgnrPsnoEnprNo = '';
    let custNm = '';
    if (person.isForgn === '미성년자') {
      persFrgnrPsnoEnprNo = person.jumin3 + person.jumin4;
      custNm = person.userNameP;
    } else {
      persFrgnrPsnoEnprNo = person.jumin1 + person.jumin2;
      custNm = person.userName;
    }

    const jumin64 = Buffer.from(persFrgnrPsnoEnprNo, 'utf-8').toString(
      'base64'
    );
    const dataCM806 = {
      custNm: custNm.toUpperCase(),
      inqDvCd,
      isuDt: person.publishedDate,
      persFrgnrPsnoEnprNo: jumin64,
      drvLcnsNo:
        person.driverLicenseNumber1 +
        person.driverLicenseNumber2 +
        person.driverLicenseNumber3 +
        person.driverLicenseNumber4,
    };
    const { data } = await axios.post(tokenUrl, dataCM806);
    // console.log(data);
    // console.log('dataCM806');
    let returnValue = false;
    if (data.totSuccCd === 'Y') {
      returnValue = true;
    }
    return returnValue;
  };
  const inicisKcb = async () => {
    const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/checkIdentification`;
    const passedIdentification = await axios.post(tokenUrl, {
      mTxId: keys.mTxId,
      userName: person.userName,
      jumin1: person.jumin1,
    });
    // console.log(passedIdentification.data);
    // console.log('passedIdentification.data');

    const as = passedIdentification.data[0];
    // console.log(as?.DI);
    // console.log('as.DI');
    return {
      isOk: passedIdentification.data.length > 0,
      sucType: as?.TYPE || '',
      DI: as?.DI || '',
    };
  };
  const finalSuc = async (_TYPE = '', _DI = '') => {
    sessionStorage.setItem(
      'S5Identification',
      JSON.stringify({
        ...person,
        mTxId: keys.mTxId,
        identification,
        inicisKcb: _TYPE,
        di: _DI,
        totalJumin12: person.jumin1 + person.jumin2,
        totalJumin34: person.jumin3 + person.jumin4,
        totalDriverNumber:
          person.driverLicenseNumber1 +
          person.driverLicenseNumber2 +
          person.driverLicenseNumber3 +
          person.driverLicenseNumber4,
      })
    );
    const S3JoinType = sessionStorage.getItem('S3JoinType') || '';
    const S3JoinTypeJson = JSON.parse(S3JoinType);
    if (S3JoinTypeJson.joinType === '신규가입') {
      await router.push('./S8HopeNumber');
    } else {
      await router.push('./S6UbuniInfo');
    }
  };

  const nextBtn = async () => {
    // 무슨 밸리데이션이 이러냐
    const lgIdentificationCheck = await identificationCheckLG();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !lgIdentificationCheck && alert('신분증이 정확하지 않습니다.');

    const inicisKcbCheck = await inicisKcb();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    lgIdentificationCheck &&
      !inicisKcbCheck.isOk &&
      alert('본인인증이 일치하지 않습니다.');

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    lgIdentificationCheck &&
      inicisKcbCheck.isOk &&
      finalSuc(inicisKcbCheck.sucType, inicisKcbCheck.DI);
  };

  const userType = () => {
    let component: JSX.Element;
    if (person.isForgn === '개인') {
      component = (
        <>
          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor="driverLicenseNumber"
              className="mb-5 block text-sm font-medium text-gray-700"
            >
              주민등록번호
            </label>
            <div className="mb-5 flex">
              <input
                type="text"
                name="jumin1"
                maxLength={6}
                onChange={handleInputChange}
                value={person.jumin1}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
              <span className="p-3">-</span>
              <input
                type="text"
                name="jumin2"
                maxLength={7}
                onChange={handleInputChange}
                value={person.jumin2}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
            </div>
          </div>
          {identification?.title === '주민등록증' ? (
            <div className="col-span-6 sm:col-span-4">
              <img
                src={`${router.basePath}/assets/images/registration_card.png`}
                alt={'주민증'}
              />
            </div>
          ) : (
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="driverLicenseNumber"
                className="mb-5 block text-sm font-medium text-gray-700"
              >
                운전면허 번호
              </label>
              <div className="mb-5 flex">
                <select
                  name="driverLicenseNumber1"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:outline-none sm:text-sm"
                  onChange={handleInputChange}
                  value={person.driverLicenseNumber1}
                >
                  {driverLicenceRegion.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="driverLicenseNumber2"
                  maxLength={2}
                  onChange={handleInputChange}
                  value={person.driverLicenseNumber2}
                  className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="driverLicenseNumber3"
                  maxLength={6}
                  onChange={handleInputChange}
                  value={person.driverLicenseNumber3}
                  className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="driverLicenseNumber4"
                  maxLength={2}
                  onChange={handleInputChange}
                  value={person.driverLicenseNumber4}
                  className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
              </div>
              <img
                src={`${router.basePath}/assets/images/drivers_license.png`}
                alt={'면허증'}
              />
            </div>
          )}
          <div className="col-span-6 mt-5 mb-3">
            <label
              htmlFor="publishedDate"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              발급일자
            </label>
            <input
              type="text"
              name="publishedDate"
              value={person.publishedDate}
              maxLength={8}
              className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              onChange={handleInputChange}
              placeholder="ex) 20161125"
            />
          </div>
        </>
      );
    } else if (person.isForgn === '미성년자') {
      component = (
        <div className="col-span-6 sm:col-span-6">
          <div className="col-span-6 sm:col-span-4">
            <label
              htmlFor="driverLicenseNumber"
              className="mb-5 block text-sm font-medium text-gray-700"
            >
              본인 주민등록번호
            </label>
            <div className="mb-5 flex">
              <input
                type="text"
                name="jumin1"
                onChange={handleInputChange}
                maxLength={6}
                value={person.jumin1}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
              <span className="p-3">-</span>
              <input
                type="text"
                name="jumin2"
                maxLength={7}
                onChange={handleInputChange}
                value={person.jumin2}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-6 sm:col-span-4">
            <label
              htmlFor="driverLicenseNumber3"
              className="mb-5 block text-sm font-medium text-gray-700"
            >
              이름, 주민등록번호(법정대리인)
            </label>
            <div className="mb-5 flex">
              <input
                type="text"
                name="userNameP"
                onChange={handleInputChange}
                value={person.userNameP}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
              <span className="p-3">/</span>
              <input
                type="text"
                name="jumin3"
                onChange={handleInputChange}
                value={person.jumin3}
                maxLength={6}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
              <span className="p-3">-</span>
              <input
                type="text"
                name="jumin4"
                onChange={handleInputChange}
                value={person.jumin4}
                maxLength={7}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-6 sm:col-span-4">
            <label
              htmlFor="driverLicenseNumber3"
              className="mb-5 block text-sm font-medium text-gray-700"
            >
              사진 파일 첨부(법정대리인)
            </label>
            <div className="mb-5 flex">
              <button
                onClick={() => {
                  setPicAttOpenFtp1(true);
                }}
                className="w-full p-3 border border-gray-300 shadow-sm focus:outline-none"
              >
                신분증 사진 첨부
              </button>
              <FtpImgModal
                k={{
                  picAttOpenFtp: picAttOpenFtp1,
                  setPicAttOpenFtp: setPicAttOpenFtp1,
                  uploadImg: uploadImg1,
                  setUploadImg: setUploadImg1,
                  closeModalForFtp: closeModalForFtp1,
                  urlKey: 'ftpImgUrl2',
                }}
              />
              <span className="p-3" />
              <button
                onClick={() => {
                  setPicAttOpenFtp2(true);
                }}
                className="w-full p-3 border border-gray-300 shadow-sm focus:outline-none"
              >
                가족관계증명서 사진 첨부
              </button>
              <FtpImgModal
                k={{
                  picAttOpenFtp: picAttOpenFtp2,
                  setPicAttOpenFtp: setPicAttOpenFtp2,
                  uploadImg: uploadImg2,
                  setUploadImg: setUploadImg2,
                  closeModalForFtp: closeModalForFtp2,
                  urlKey: 'ftpImgUrl3',
                }}
              />
            </div>
          </div>
          {identification?.title === '주민등록증' ? (
            <div className="col-span-6 sm:col-span-4">
              <img
                src={`${router.basePath}/assets/images/registration_card.png`}
                alt={'주민증'}
              />
            </div>
          ) : (
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="driverLicenseNumber"
                className="mb-5 block text-sm font-medium text-gray-700"
              >
                운전면허 번호(법정대리인)
              </label>
              <div className="mb-5 flex">
                <select
                  name="driverLicenseNumber1"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:outline-none sm:text-sm"
                  onChange={handleInputChange}
                  value={person.driverLicenseNumber1}
                >
                  {driverLicenceRegion.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="driverLicenseNumber2"
                  onChange={handleInputChange}
                  maxLength={2}
                  value={person.driverLicenseNumber2}
                  className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="driverLicenseNumber3"
                  maxLength={6}
                  onChange={handleInputChange}
                  value={person.driverLicenseNumber3}
                  className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
                <span className="p-3">-</span>
                <input
                  type="text"
                  name="driverLicenseNumber4"
                  maxLength={2}
                  onChange={handleInputChange}
                  value={person.driverLicenseNumber4}
                  className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                />
              </div>
              <img
                src={`${router.basePath}/assets/images/drivers_license.png`}
                alt={'면허증'}
              />
            </div>
          )}
          <div className="col-span-6 my-3">
            <label
              htmlFor="publishedDate"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              발급일자(법정대리인)
            </label>
            <input
              type="text"
              name="publishedDate"
              value={person.publishedDate}
              maxLength={8}
              className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              onChange={handleInputChange}
              placeholder="ex) 20161125"
            />
          </div>
        </div>
      );
    } else {
      component = (
        <>
          <div className="col-span-12 sm:col-span-6">
            <div className="mb-5 flex">
              <button
                onClick={() => {
                  setPicAttOpenFtp3(true);
                }}
                className="w-full p-3 border border-gray-300 shadow-sm focus:outline-none"
              >
                외국인 신분증 앞면 첨부
              </button>
              <FtpImgModal
                k={{
                  picAttOpenFtp: picAttOpenFtp3,
                  setPicAttOpenFtp: setPicAttOpenFtp3,
                  uploadImg: uploadImg3,
                  setUploadImg: setUploadImg3,
                  closeModalForFtp: closeModalForFtp3,
                  urlKey: 'ftpImgUrl4',
                }}
              />
              <span className="p-3" />
              <button
                onClick={() => {
                  setPicAttOpenFtp4(true);
                }}
                className="w-full p-3 border border-gray-300 shadow-sm focus:outline-none"
              >
                외국인 신분증 뒷면 첨부
              </button>
              <FtpImgModal
                k={{
                  picAttOpenFtp: picAttOpenFtp4,
                  setPicAttOpenFtp: setPicAttOpenFtp4,
                  uploadImg: uploadImg4,
                  setUploadImg: setUploadImg4,
                  closeModalForFtp: closeModalForFtp4,
                  urlKey: 'ftpImgUrl5',
                }}
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="driverLicenseNumber"
              className="mb-5 block text-sm font-medium text-gray-700"
            >
              외국인번호
            </label>
            <div className="mb-5 flex">
              <input
                type="text"
                name="jumin1"
                onChange={handleInputChange}
                value={person.jumin1}
                maxLength={6}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
              <span className="p-3">-</span>
              <input
                type="text"
                name="jumin2"
                maxLength={7}
                onChange={handleInputChange}
                value={person.jumin2}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-6 my-3">
            <label
              htmlFor="publishedDate"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              발급일자(외국인 신분증)
            </label>
            <input
              type="text"
              name="publishedDate"
              value={person.publishedDate}
              maxLength={8}
              className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              onChange={handleInputChange}
              placeholder="ex) 20161125"
            />
          </div>
        </>
      );
    }
    return component;
  };

  useEffect(() => {
    const mTxId = `smar${moment().format('YYMMDDHHmmssms')}`;
    const authHash = crypto
      .createHash('sha256')
      .update(keys.mid + mTxId + keys.apiKey)
      .digest('hex');
    setKeys({
      ...keys,
      authHash,
      mTxId,
    });
    const s1 = sessionStorage.getItem('S1UserType') || '';
    const s1Parse = JSON.parse(s1);
    setPerson({
      ...person,
      isForgn: s1Parse.value,
    });
  }, []);

  return (
    <Main>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="col-span-6 sm:col-span-6 mb-3">
            <label
              htmlFor="userName"
              className="mb-3 block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
              onChange={handleInputChange}
              value={person.userName}
            />
          </div>
          <div className="col-span-6 mb-3">
            <label
              htmlFor="email1"
              className="w-full mb-3 block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <div className="flex">
              <input
                type="text"
                name="email1"
                id="email1"
                className="block w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                onChange={handleInputChange}
                value={person.email1}
              />
              <span className="p-3">@</span>
              <input
                type="text"
                name="email2"
                id="email2"
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm sm:text-sm"
                onChange={handleInputChangeForEmail2}
                value={person.email2}
              />
              <select
                name="email3"
                value={person.email3}
                onChange={handleInputChangeForEmail3}
                className="ml-2 block w-full rounded-md border border-gray-300 bg-white p-3 shadow-sm focus:outline-none sm:text-sm"
              >
                {emailList.map((item) => (
                  <option key={item.title} value={item.title}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {person.isForgn === '외국인' ? null : (
            <div className="col-span-6 sm:col-span-6">
              <label className="mb-3 block text-sm font-medium text-gray-700">
                신분증 정보
              </label>
              <RadioGroup value={identification} onChange={setIdentification}>
                <div className="mb-5 grid grid-cols-2">
                  {identificationTypes.map((item) => (
                    <RadioGroup.Option
                      key={item.title}
                      value={item}
                      as={Fragment}
                    >
                      {({ checked }) => (
                        <button className="rounded-md border px-8 py-3 text-base font-medium md:py-4 md:px-10 md:text-lg">
                          <div className="flex items-center">
                            {checked && (
                              <div className="mr-2 shrink-0 text-white">
                                <CheckIcon className="h-6 w-6" />
                              </div>
                            )}
                            {item.title}
                          </div>
                        </button>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
          {userType()}

          <div className="flex col-span-6">
            <S5Identification2 k={{ ...keys, ...person }} />
            <span className="p-3" />
            <S5Identification3KCB k={{ ...keys, ...person }} />
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6">
          <button
            onClick={() => {
              // if (process.env.NEXT_PUBLIC_ENV_VARIABLE === 'development') {
              //   finalSuc();
              // }
              const validateJumin12 =
                (person.jumin1 + person.jumin2).length === 13;
              const validateJumin34 =
                (person.jumin3 + person.jumin4).length === 13;
              const validateDriverNumber =
                (
                  person.driverLicenseNumber1 +
                  person.driverLicenseNumber2 +
                  person.driverLicenseNumber3 +
                  person.driverLicenseNumber4
                ).length === 12;

              const type1 =
                person.isForgn === '미성년자' &&
                identification?.title === '주민등록증' &&
                validateJumin12 &&
                validateJumin34;
              const type2 =
                person.isForgn === '미성년자' &&
                identification?.title === '운전면허증' &&
                validateJumin12 &&
                validateJumin34 &&
                validateDriverNumber;
              const type3 =
                person.isForgn === '개인' &&
                identification?.title === '주민등록증' &&
                validateJumin12;
              const type4 =
                person.isForgn === '개인' &&
                identification?.title === '운전면허증' &&
                validateJumin12 &&
                validateDriverNumber;
              const type5 = person.isForgn === '외국인' && validateJumin12;
              if (type1 || type2 || type3 || type4 || type5) {
                nextBtn();
              } else {
                alert('정확한 값을 입력해주세요');
              }
            }}
            className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
          >
            다음
          </button>
        </div>
      </div>
    </Main>
  );
};

export default S5PhoneNumber;
