import axios from 'axios';
import CryptoJS from 'crypto-js';

const CheckIcon = (props: any) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#120909" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#9d1818"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const encrypt = (val: any) => {
  const text = val.toString();
  const data = {
    id: text,
  };
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'SMTL');
  const result = encrypted.toString();
  return encodeURIComponent(result);
};

const saveImage = (_uploadImg: any, _title: string) => {
  const formData = new FormData();
  formData.append('file', _uploadImg);
  // console.log(_uploadImg);
  // console.log('formData');
  axios({
    url: `${process.env.NEXT_PUBLIC_API_URL}/saveImage`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      if (res.data.code === 226) {
        const u1 = res.data.ftpUploadUrl;
        sessionStorage.setItem(
          _title,
          JSON.stringify({
            usimImg: u1,
          })
        );
        alert('유심 사진이 저장되었습니다.');
      } else if (res.data.code === 553) {
        alert('사진이 첨부되지 않았습니다');
      }
    })
    .catch((e) => {
      console.log(e);
      alert('사진이 전송되지 않았습니다.');
    });
};

export { CheckIcon, encrypt, saveImage };
