import { forwardRef, useContext, useImperativeHandle, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { FtpImgModal, juminRuleTest } from '@/utils/Commons';
import { Context } from '@/utils/Context';
import { Warning } from '@/utils/Svgs';

export const S5PersonalInfo2 = forwardRef((props, ref) => {
  const { total, setTotal } = useContext(Context) as any;
  const [userNameParent, setUserNameParent] = useState('');
  const [jumin3, setJumin3] = useState('');
  const [jumin4, setJumin4] = useState('');
  const [verifyCHeckJumin, setVerifyCHeckJumin] = useState(true);
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
  useImperativeHandle(ref, () => ({
    childFunction1() {
      console.log(props);
      const isOk = juminRuleTest(`${jumin3}-${jumin4}`);
      console.log('child function 22222222 called');
      console.log(isOk);

      setVerifyCHeckJumin(isOk);
      if (isOk) {
        setTotal({
          ...total,
          userNameParent,
          jumin34: jumin3 + jumin4,
          jumin3,
        });
      }
      return isOk;
    },
  }));
  return (
    <>
      <br className={'mt-[32px]'} />
      <h3 className="mt-[8px] text-[16px] text-[#868e96]">
        법정대리인의 <br /> 정보를 입력해주세요
      </h3>
      <br className={'mt-[32px]'} />
      <input
        className={`${styles.inputBox} w-full`}
        placeholder="이름을 입력해 주세요"
        value={userNameParent}
        onChange={(e) => {
          setUserNameParent(e.target.value);
        }}
        type="text"
      />
      <div className={'mt-[32px] flex'}>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="앞자리"
          maxLength={6}
          value={jumin3}
          type="text"
          onChange={(e) => {
            const regex = /[^0-9]/g;
            setJumin3(e.target.value.replace(regex, ''));
          }}
        />
        <div className={`${styles.hipen}`}>-</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="뒷자리"
          maxLength={7}
          value={jumin4}
          type="password"
          onChange={(e) => {
            const regex = /[^0-9]/g;
            setJumin4(e.target.value.replace(regex, ''));
          }}
        />
      </div>
      {verifyCHeckJumin ? null : (
        <div className="mt-[24px]">
          <div className={`${styles.juminWaring}`}>
            <Warning />
            주민등록번호를 다시 확인해 주세요
          </div>
        </div>
      )}
      <br className={'mt-[32px]'} />
      <h3 className="mt-[8px] text-[16px] text-[#868e96]">
        사진 파일 첨부(법정대리인)
      </h3>
      <br className={'mt-[32px]'} />
      <div className="col-span-6 sm:col-span-4">
        <div className="mb-5 flex">
          <button
            onClick={() => {
              setPicAttOpenFtp1(true);
            }}
            className="text-[16px] w-full border border-gray-300 p-1"
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
              total,
              setTotal,
            }}
          />
          <span className="p-3" />
          <button
            onClick={() => {
              setPicAttOpenFtp2(true);
            }}
            className="text-[16px] w-full border border-gray-300 p-1"
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
              total,
              setTotal,
            }}
          />
        </div>
      </div>
    </>
  );
});
S5PersonalInfo2.displayName = 'S5PersonalInfo2';
export default S5PersonalInfo2;
