import axios from 'axios';
import { useEffect, useState } from 'react';

const S5Identification3KCB = (_props: any) => {
  const [key, setKey] = useState({
    mid: '',
    mTxId: '',
    authHash: '',
    userName: '',
    userPhone: '',
    userBirth: '',
    userHash: '',
    reqSvcCd: '01',
    MDL_TKN: '',
    CP_CD: `${process.env.NEXT_PUBLIC_KCB_CP_CD}`,
  });
  const handleInputChange = (e: any) => {
    setKey({ ...key, [e.target.name]: e.target.value });
  };
  const openKCBPopup = async () => {
    const width = 400;
    const height = 620;
    const xPos = document.body.offsetWidth / 2 - width / 2; // 가운데 정렬
    window.open(
      '',
      'sa_popup2',
      `width=${width}, height=${height}, left=${xPos}, menubar=yes, status=yes, titlebar=yes, resizable=yes`
    );
  };
  useEffect(() => {
    async function getKcbMDLToken() {
      try {
        const getKeyUrl = `${process.env.NEXT_PUBLIC_API_URL}/kcbCardStep1`;
        const result = await axios.post(getKeyUrl);
        if (result.data.RSLT_CD === 'T300') {
          setKey({
            ...key,
            MDL_TKN: result.data.MDL_TKN,
          });
          console.log(result.data.MDL_TKN);
        } else {
          console.log(result.data.code);
        }
      } catch (e) {
        console.log('getKcbMDLToken e');
        console.log(e);
      }
    }
    getKcbMDLToken();
  }, []);
  return (
    <form
      name="saForm2"
      method="post"
      target="sa_popup2"
      action="https://card.ok-name.co.kr/popup/main/start.do"
    >
      <input
        type="hidden"
        name="mdlTkn"
        value={key.MDL_TKN}
        onChange={handleInputChange}
      />
      <input type="hidden" name="cpCd" defaultValue={key.CP_CD} />
      <button
        type="submit"
        className="p-3 border border-gray-300 shadow-sm focus:outline-none"
        onClick={openKCBPopup}
      >
        신용카드 본인 인증
      </button>
    </form>
  );
};

export default S5Identification3KCB;
