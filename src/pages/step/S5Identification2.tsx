import axios from 'axios';
import { useEffect, useState } from 'react';

const S5Identification2 = (_props: any) => {
  const [key, setKey] = useState({
    userName: '',
    userPhone: '',
    userBirth: '',
    userHash: '',
    authHash: '',
    mTxId: ``,
    reqSvcCd: _props.k.reqSvcCd,
    apiKey: _props.k.apiKey,
    mid: _props.k.mid,
  });
  const handleInputChange = (e: any) => {
    setKey({ ...key, [e.target.name]: e.target.value });
  };
  const onSubmit = () => {
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
  };
  useEffect(() => {
    const { k } = _props;
    setKey({
      ...key,
      userName: k.userName,
      userPhone: k.userPhone,
      userBirth: k.userBirth,
      userHash: k.userHash,
      authHash: k.authHash,
      mTxId: k.mTxId,
    });
  }, [_props]);
  return (
    <form
      name="saForm"
      method="post"
      target="sa_popup"
      action="https://sa.inicis.com/auth"
      onSubmit={onSubmit}
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
        className="p-3 border border-gray-300 shadow-sm focus:outline-none"
      >
        이니시스 본인 인증 하기
      </button>
    </form>
  );
};

export default S5Identification2;
