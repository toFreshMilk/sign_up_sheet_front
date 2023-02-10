import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const S5Identification3KCB = (_props: any) => {
  const { k } = _props;
  const didMount = useRef(false);
  const [key, setKey] = useState({
    MDL_TKN: '',
    CP_CD: `${process.env.NEXT_PUBLIC_KCB_CP_CD}`,
  });
  const beforeIdentification = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/beforeIdentification`;
    const data2 = {
      mTxId: k?.mTxId,
      userName: k?.userName,
      jumin1: k?.jumin1,
      type: '신용카드인증',
    };
    axios.post(url, data2);
  };
  const getKcbMDLToken = async () => {
    try {
      const getKeyUrl = `${process.env.NEXT_PUBLIC_API_URL}/kcbCardStep1`;
      const result = await axios.post(getKeyUrl, { RETURN_MSG: k?.mTxId });
      if (result.data.RSLT_CD === 'T300') {
        setKey({
          ...key,
          MDL_TKN: result.data.MDL_TKN,
        });
      } else {
        console.log(result.data.code);
      }
    } catch (e) {
      console.log('getKcbMDLToken e');
      console.log(e);
    }
  };
  const openKcbPopup = async () => {
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
    if (didMount.current) {
      openKcbPopup();
      const wdwDct = document as any;
      const form2 = wdwDct.createElement('form');
      form2.setAttribute('id', 'saForm2');
      form2.setAttribute('method', 'Post');
      form2.setAttribute('target', 'sa_popup2');
      form2.setAttribute(
        'action',
        'https://card.ok-name.co.kr/popup/main/start.do'
      );
      let hiddenField = wdwDct.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', 'mdlTkn');
      hiddenField.setAttribute('value', key.MDL_TKN);
      form2.append(hiddenField);
      hiddenField = wdwDct.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', 'cpCd');
      hiddenField.setAttribute('value', key.CP_CD);
      form2.append(hiddenField);
      wdwDct.body.appendChild(form2);
      form2.submit();
      beforeIdentification();
      setTimeout(() => {
        const ff = wdwDct.getElementById('saForm2');
        ff.remove();
      }, 500);
    } else {
      didMount.current = true;
    }
  }, [key.MDL_TKN]);
  return (
    <button
      onClick={getKcbMDLToken}
      className="w-full border border-gray-300 p-3 shadow-sm focus:outline-none"
    >
      신용카드 본인 인증
    </button>
  );
};

export default S5Identification3KCB;
