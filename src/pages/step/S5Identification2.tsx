import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment';
import { useEffect } from 'react';

axios.defaults.withCredentials = true;

const S5Identification2 = (_props: any) => {
  useEffect(() => {
    console.log('_props');
    console.log(_props);
  }, []);

  return (
    <form
      name="saForm"
      method="post"
      target="sa_popup"
      action="https://sa.inicis.com/auth"
    >
      <input type="text" name="mid" defaultValue="INIiasTest" />
      <input type="text" name="reqSvcCd" defaultValue="01" />
      <input type="text" name="mTxId" defaultValue="mTxId_1668754078819" />
      <input
        type="text"
        name="successUrl"
        defaultValue="https://join.smartelmobile.com/api/receiveInicisSuc"
      />
      <input
        type="text"
        name="failUrl"
        defaultValue="https://join.smartelmobile.com/api/receiveInicisFail"
      />
      <input
        type="text"
        name="authHash"
        defaultValue="df39eaaf785c3a7fb58948446a749b67b86fb5188b8f68011f948dd140af0453"
      />
      <input type="text" name="flgFixedUser" defaultValue="Y" />
      <input type="text" name="userName" defaultValue="이성민" />
      <input type="text" name="userPhone" defaultValue="01089025658" />
      <input type="text" name="userBirth" defaultValue="19890413" />
      <input
        type="text"
        name="userHash"
        defaultValue="3162fde6de62d60459fc4864c707faa9f5bbebff688831fe44168709ddf87a56"
      />
      <input type="text" name="reservedMsg" defaultValue="isUseToken=Y" />
      <button
        type="submit"
        onClick={async () => {
          const width = 400;
          const height = 620;
          const xPos = document.body.offsetWidth / 2 - width / 2; // 가운데 정렬
          window.open(
            '',
            'sa_popup',
            `width=${width}, height=${height}, left=${xPos}, menubar=yes, status=yes, titlebar=yes, resizable=yes`
          );

          const mtxId = `smar${moment().format('YYMMDDHHmmssms')}`;
          console.log('mtxId');
          console.log(mtxId);

          // crypto로 sha256한 후 인코딩 hex로 생성
          const hashingKey = 'abc123';
          const toSecret = '숨길것';
          const hashed = crypto
            .createHmac('sha256', hashingKey)
            .update(toSecret)
            .digest('hex');
          console.log(hashed);

          // 여기서 DB 로우 생성, 입력 위로 올라가야할듯
          const url = `${process.env.NEXT_PUBLIC_API_URL}/beforeIdentification`;
          const data = {
            mTxId: 'mTxId_1668754078810',
            userName: '이성민',
            userPhone: '01089025658',
          };
          const aaaa = await axios.post(url, data);
          console.log(aaaa);
        }}
      >
        본인 인증 하기
      </button>
    </form>
  );
};

export default S5Identification2;
