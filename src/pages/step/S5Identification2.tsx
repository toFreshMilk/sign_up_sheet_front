import axios from 'axios';

const S5Identification2 = (_props: any) => {
  const { k } = _props;
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
      mTxId: k?.mTxId,
      userName: k?.userName,
      userPhone: k?.userPhone,
    };
    axios.post(url, data2);
  };
  return (
    <form
      name="saForm"
      method="post"
      target="sa_popup"
      action="https://sa.inicis.com/auth"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="flgFixedUser" defaultValue="Y" />
      <input type="hidden" name="mid" defaultValue={k?.mid} />
      <input type="hidden" name="identifier" defaultValue={k?.mid} />
      <input type="hidden" name="reqSvcCd" defaultValue={k?.reqSvcCd} />
      <input type="hidden" name="mTxId" defaultValue={k?.mTxId} />
      <input type="hidden" name="authHash" defaultValue={k?.authHash} />
      <input type="hidden" name="userName" defaultValue={k?.userName} />
      <input type="hidden" name="userPhone" defaultValue={k?.userPhone} />
      <input type="hidden" name="userHash" defaultValue={k?.userHash} />
      <input type="hidden" name="userBirth" defaultValue={k?.userBirth} />
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
