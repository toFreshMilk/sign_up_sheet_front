import axios from 'axios';
import CryptoJS from 'crypto-js';
import Modal from 'react-modal';

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
const saveImage = (
  _uploadImg: any,
  _title: string,
  total: any,
  setTotal: any
) => {
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
        total.ftpImgUrls.push(u1);
        setTotal({
          ...total,
        });
        sessionStorage.setItem(
          _title,
          JSON.stringify({
            usimImg: u1,
          })
        );
        alert('유심 사진이 저장되었습니다.');
      } else if (res.data.code === 553) {
        alert('사진이 첨부되지 않았습니다 code - 553');
      }
    })
    .catch((e) => {
      console.log(e);
      alert('사진이 전송되지 않았습니다.');
    });
};
const FtpImgModal = (_props: any) => {
  const { k } = _props;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  return (
    <Modal isOpen={k.picAttOpenFtp} ariaHideApp={false} style={customStyles}>
      <>
        <input
          type="file"
          name="imageFile"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            const files = target?.files || [];
            k.setUploadImg(files[0]);
          }}
        />
        <div className="mt-3 flex space-x-1">
          <button onClick={k.closeModalForFtp} className="border p-3">
            취소
          </button>
          <button
            type="submit"
            onClick={() => {
              saveImage(k.uploadImg, k.urlKey, k.total, k.setTotal);
            }}
            className="border p-3"
          >
            저장
          </button>
        </div>
      </>
    </Modal>
  );
};
const identificationCheckLG = async (_param: any) => {
  // 신분증 종류, 외국인 여부, 주민번호, 신분증 발급일자
  // 면허번호
  const tokenUrl = `${process.env.NEXT_PUBLIC_API_URL}/getCM806`;
  const jumin64 = Buffer.from(_param.persFrgnrPsnoEnprNo, 'utf-8').toString(
    'base64'
  );
  const dataCM806 = {
    custNm: _param.custNm,
    inqDvCd: _param.inqDvCd,
    isuDt: _param.isuDt,
    persFrgnrPsnoEnprNo: jumin64,
    drvLcnsNo: _param.drvLcnsNo,
  };
  const { data } = await axios.post(tokenUrl, dataCM806);
  return data;
};
const getLocalStorage = (key: string, initialValue: any) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
};
const setLocalStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
};
const juminRuleTest = (key: string) => {
  const juminRule =
    /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
  return juminRule.test(key);
};
export {
  CheckIcon,
  encrypt,
  FtpImgModal,
  getLocalStorage,
  identificationCheckLG,
  juminRuleTest,
  saveImage,
  setLocalStorage,
};
