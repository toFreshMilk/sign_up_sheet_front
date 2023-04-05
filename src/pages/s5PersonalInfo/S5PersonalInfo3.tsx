import { forwardRef, useContext, useImperativeHandle, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { FtpImgModal, juminRuleTest } from '@/utils/Commons';
import { Context } from '@/utils/Context';
import { Warning } from '@/utils/Svgs';

export const S5PersonalInfo3 = forwardRef((_props, ref) => {
  const { total, setTotal } = useContext(Context) as any;
  const [userName, setUserName] = useState('');
  const [jumin1, setJumin1] = useState('');
  const [jumin2, setJumin2] = useState('');
  const [verifyCHeckJumin, setVerifyCHeckJumin] = useState(true);
  useImperativeHandle(ref, () => ({
    childFunction1() {
      console.log('child function 33333333333 called');
      const isOk = juminRuleTest(`${jumin1}-${jumin2}`);
      setVerifyCHeckJumin(isOk);
      if (isOk) {
        setTotal({
          ...total,
          userName,
          jumin12: jumin1 + jumin2,
          jumin1,
        });
      }
      return isOk;
    },
  }));
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
  return (
    <>
      <input
        className={`${styles.inputBox} w-full`}
        placeholder="이름을 입력해 주세요"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        type="text"
      />
      <div className={'mt-[32px] flex'}>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="앞자리"
          maxLength={6}
          value={jumin1}
          type="text"
          onChange={(e) => {
            const regex = /[^0-9]/g;
            setJumin1(e.target.value.replace(regex, ''));
          }}
        />
        <div className={`${styles.hipen}`}>-</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="뒷자리"
          maxLength={7}
          value={jumin2}
          type="password"
          onChange={(e) => {
            const regex = /[^0-9]/g;
            setJumin2(e.target.value.replace(regex, ''));
          }}
        />
      </div>
      {verifyCHeckJumin ? null : (
        <div className="mt-[24px]">
          <div className={`${styles.juminWaring}`}>
            <Warning />
            외국인번호를 다시 확인해 주세요
          </div>
        </div>
      )}
      <br className={'mt-[32px]'} />
      <div className="mb-5 flex">
        <button
          onClick={() => {
            setPicAttOpenFtp3(true);
          }}
          className="text-[16px] w-full border border-gray-300 p-1"
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
          className="text-[16px] w-full border border-gray-300 p-1"
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
    </>
  );
});
S5PersonalInfo3.displayName = 'S5PersonalInfo3';
export default S5PersonalInfo3;
