// import axios from 'axios';
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
    kcbToken: '',
  });
  const handleInputChange = (e: any) => {
    setKey({ ...key, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    async function getKcbInfo() {
      try {
        // const getKeyUrl = `${process.env.NEXT_PUBLIC_API_URL}/kcbCardStep1`;
        // const { data } = await axios.post(getKeyUrl);
        // console.log(data);
        // setKey({
        //   ...key,
        //   kcbToken: 'kcbTokendd',
        // });
        console.log('data');
      } catch (e) {
        console.log('getKcbInfo e');
        console.log(e);
      }
    }
    getKcbInfo();
  }, [_props]);
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
        value={key.kcbToken}
        onChange={handleInputChange}
      />
      <input type="hidden" name="cpCd" defaultValue="T00000000001" />
      <button
        type="submit"
        className="p-3 border border-gray-300 shadow-sm focus:outline-none"
        onClick={async () => {
          try {
            const width = 400;
            const height = 620;
            const xPos = document.body.offsetWidth / 2 - width / 2; // 가운데 정렬
            window.open(
              '',
              'sa_popup2',
              `width=${width}, height=${height}, left=${xPos}, menubar=yes, status=yes, titlebar=yes, resizable=yes`
            );
          } catch (e) {
            console.log('kcbCardStep1 e');
            console.log(e);
          }
        }}
      >
        신용카드 본인 인증
      </button>
    </form>
  );
};

export default S5Identification3KCB;
