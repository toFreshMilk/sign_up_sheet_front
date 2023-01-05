import axios from 'axios';

const S5Identification2 = (_props: any) => {
  const { k } = _props;
  const openInicisPopup = () => {
    const width = 400;
    const height = 620;
    const xPos = document.body.offsetWidth / 2 - width / 2; // 가운데 정렬
    window.open(
      '',
      'sa_popup',
      `width=${width}, height=${height}, left=${xPos}, menubar=yes, status=yes, titlebar=yes, resizable=yes`
    );
  };
  const beforeIdentification = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/beforeIdentification`;
    const data2 = {
      mTxId: k?.mTxId,
      userName: k?.userName,
      jumin1: k?.jumin1,
      type: '전자서명인증',
    };
    axios.post(url, data2);
  };
  const createInicisForm = () => {
    openInicisPopup();
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
    hiddenField.setAttribute('value', k?.mid);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'identifier');
    hiddenField.setAttribute('value', k?.userName);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'reqSvcCd');
    hiddenField.setAttribute('value', k?.reqSvcCd);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'mTxId');
    hiddenField.setAttribute('value', k?.mTxId);
    form1.append(hiddenField);
    hiddenField = wdwDct.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', 'authHash');
    hiddenField.setAttribute('value', k?.authHash);
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
  return (
    <button
      onClick={() => {
        beforeIdentification();
        createInicisForm();
      }}
      className="w-full p-3 border border-gray-300 shadow-sm focus:outline-none"
    >
      이니시스 본인 인증 하기
    </button>
  );
};

export default S5Identification2;
