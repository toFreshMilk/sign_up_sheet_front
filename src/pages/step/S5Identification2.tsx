import axios from 'axios';
import crypto from 'crypto';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

const S5Identification2 = (_props: any) => {
  const [key, setKey] = useState({
    mid: '',
    mTxId: '',
    authHash: '',
    userName: '',
    userPhone: '',
    userBirth: '',
    userHash: '',
    reqSvcCd: '01',
  });
  const handleInputChange = (e: any) => {
    setKey({ ...key, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const { k } = _props;
    console.log(k);

    let authHashStr = k.mid + k.mTxId + k.apiKey;
    authHashStr = crypto.createHash('sha256').update(authHashStr).digest('hex');
    let userHashStr = `${
      k.userName + k.mid + k.userPhone + k.mTxId + k.jumin1
    }01`;
    userHashStr = crypto.createHash('sha256').update(userHashStr).digest('hex');
    setKey({
      ...key,
      mid: k.mid,
      mTxId: k.mTxId,
      userName: k.userName,
      userPhone: k.userPhone,
      userBirth: k.userBirth,
      authHash: authHashStr,
      userHash: userHashStr,
      reqSvcCd: k.reqSvcCd,
    });
  }, [_props]);
  return (
    <form
      name="saForm"
      method="post"
      target="sa_popup"
      action="https://sa.inicis.com/auth"
    >
      <input
        type="hidden"
        name="mid"
        value={key.mid}
        onChange={handleInputChange}
      />
      <input type="hidden" name="reqSvcCd" defaultValue="01" />
      <input
        type="hidden"
        name="mTxId"
        value={key.mTxId}
        onChange={handleInputChange}
      />
      <input
        type="hidden"
        name="successUrl"
        defaultValue="https://join.smartelmobile.com/api/receiveInicisSuc"
      />
      <input
        type="hidden"
        name="failUrl"
        defaultValue="https://join.smartelmobile.com/api/receiveInicisFail"
      />
      <input
        type="hidden"
        name="authHash"
        value={key.authHash}
        onChange={handleInputChange}
      />
      <input type="hidden" name="flgFixedUser" defaultValue="Y" />
      <input
        type="hidden"
        name="userName"
        value={key.userName}
        onChange={handleInputChange}
      />
      <input
        type="hidden"
        name="userPhone"
        value={key.userPhone}
        onChange={handleInputChange}
      />
      <input
        type="hidden"
        name="userBirth"
        value={key.userBirth}
        onChange={handleInputChange}
      />
      <input
        type="hidden"
        name="userHash"
        value={key.userHash}
        onChange={handleInputChange}
      />
      <input type="hidden" name="reservedMsg" defaultValue="isUseToken=Y" />
      <button
        type="submit"
        onClick={() => {
          const width = 400;
          const height = 620;
          const xPos = document.body.offsetWidth / 2 - width / 2; // 가운데 정렬
          window.open(
            '',
            'sa_popup',
            `width=${width}, height=${height}, left=${xPos}, menubar=yes, status=yes, titlebar=yes, resizable=yes`
          );
          const url = `${process.env.NEXT_PUBLIC_API_URL}/beforeIdentification`;
          const data2 = {
            mTxId: key.mTxId,
            userName: key.userName,
            userPhone: key.userPhone,
          };
          axios.post(url, data2);
        }}
      >
        본인 인증 하기
      </button>
    </form>
  );
};

export default S5Identification2;
