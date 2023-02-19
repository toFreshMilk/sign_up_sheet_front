import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment/moment';
import { useContext, useEffect } from 'react';

import { Context } from '@/utils/Context';

const InicisAuth = () => {
  const mid = process.env.NEXT_PUBLIC_mid;
  const mTxId = `smar${moment().format('YYMMDDHHmmssms')}`;
  const apiKey = process.env.NEXT_PUBLIC_apiKey;
  const reqSvcCd = process.env.NEXT_PUBLIC_reqSvcCd;
  const authHash = crypto
    .createHash('sha256')
    .update(mid + mTxId + apiKey)
    .digest('hex');
  const { total } = useContext(Context) as any;

  const beforeIdentification = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/beforeIdentification`;
    const data2 = {
      mTxId,
      userName: total.S5PersonalInfo.userName,
      jumin1: total.S5PersonalInfo.jumin1,
      type: '전자서명인증',
    };
    axios.post(url, data2);
  };
  const createInicisForm = () => {
    beforeIdentification();
    const wdwDct = document as any;
    const form1 = wdwDct.createElement('form');
    form1.setAttribute('id', 'saForm1');
    form1.setAttribute('method', 'Post');
    form1.setAttribute('target', 'sa_popup');
    form1.setAttribute('action', 'https://sa.inicis.com/auth');
    let hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'flgFixedUser');
    hiddenField.setAttribute('value', 'N');
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'mid');
    hiddenField.setAttribute('value', mid);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'identifier');
    hiddenField.setAttribute('value', total.userName);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'reqSvcCd');
    hiddenField.setAttribute('value', reqSvcCd);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'mTxId');
    hiddenField.setAttribute('value', mTxId);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'authHash');
    hiddenField.setAttribute('value', authHash);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'successUrl');
    hiddenField.setAttribute(
      'value',
      'https://join.smartelmobile.com/api/receiveInicisSuc'
    );
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'failUrl');
    hiddenField.setAttribute(
      'value',
      'https://join.smartelmobile.com/api/receiveInicisFail'
    );
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'reservedMsg');
    hiddenField.setAttribute('value', 'isUseToken=Y');
    form1.append(hiddenField);
    wdwDct.body.appendChild(form1);
    form1.submit();
    setTimeout(() => {
      const ff = wdwDct.getElementById('saForm1');
      ff.remove();
    }, 1000);
  };
  useEffect(() => {
    console.log(total);
    createInicisForm();
  }, []);
  return <iframe name={'sa_popup'} className={'h-[700px] w-full'} />;
};

export default InicisAuth;
