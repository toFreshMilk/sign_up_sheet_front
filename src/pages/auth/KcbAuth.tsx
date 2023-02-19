import axios from 'axios';
import moment from 'moment/moment';
import { useContext, useEffect } from 'react';

import { Context } from '@/utils/Context';

const KcbAuth = () => {
  const { total } = useContext(Context) as any;

  const beforeIdentification = (_mTxId: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/beforeIdentification`;
    const data2 = {
      mTxId: _mTxId,
      userName: total.userName,
      jumin1: total.jumin1,
      type: '신용카드인증',
    };
    axios.post(url, data2);
  };

  const createKcbForm = (_mTxId: string, _MDL_TKN: string) => {
    const cpcd = `${process.env.NEXT_PUBLIC_KCB_CP_CD}`;
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
    hiddenField.setAttribute('value', _MDL_TKN);
    form2.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'cpCd');
    hiddenField.setAttribute('value', cpcd);
    form2.append(hiddenField);
    wdwDct.body.appendChild(form2);
    form2.submit();
    beforeIdentification(_mTxId);
    setTimeout(() => {
      const ff = wdwDct.getElementById('saForm2');
      ff.remove();
    }, 1000);
  };
  const getKcbMDLToken = async (_mTxId: string) => {
    try {
      const getKeyUrl = `${process.env.NEXT_PUBLIC_API_URL}/kcbCardStep1`;
      const result = await axios.post(getKeyUrl, { RETURN_MSG: _mTxId });
      if (result.data.RSLT_CD === 'T300') {
        createKcbForm(_mTxId, result.data.MDL_TKN);
      } else {
        console.log(result.data.code);
      }
    } catch (e) {
      console.log('getKcbMDLToken e');
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(total);
    const mTxId = `smar${moment().format('YYMMDDHHmmssms')}`;
    getKcbMDLToken(mTxId);
  }, []);
  return <iframe name={'sa_popup2'} className={'h-[700px] w-full'} />;
};

export default KcbAuth;
