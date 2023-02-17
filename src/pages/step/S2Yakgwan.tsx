import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

interface IfYakgwan {
  name: string;
  checked: boolean;
  value: string;
}
const S2Yakgwan = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [requiredYakgwans, setRequiredYakgwans] = useState([
    {
      name: '스마텔 서비스 이용약관 (필수)',
      checked: false,
      value: 'Yakgwan1',
    },
    {
      name: '개인정보(위치정보포함)수집, 이용 동의 (필수)',
      checked: false,
      value: 'Yakgwan2',
    },
    {
      name: '서비스 제공을 위한 개인정보 처리위탁 동의 (필수)',
      checked: false,
      value: 'Yakgwan3',
    },
    {
      name: '개인신용정보 조회 동의 (필수)',
      checked: false,
      value: 'Yakgwan4',
    },
    {
      name: '본인인증(본인확인)서비스 제공 (필수)',
      checked: false,
      value: 'Yakgwan5',
    },
    {
      name: '서비스 제공을 위한 제 3자 제공 동의 (필수)',
      checked: false,
      value: 'Yakgwan6',
    },
  ]);
  const [optionalYakgwans, setOptionalYakgwans] = useState([
    {
      name: '정보광고 전송을 위한 개인정보 이용, 취급위탁 및 정보광고 수신동의 (선택)',
      checked: false,
      value: 'Yakgwan7',
    },
    { name: '정보광고 전송 동의(선택)', checked: false, value: 'Yakgwan8' },
  ]);
  return (
    <Main>
      <h1 className="mb-[32px] flex items-start text-[24px] font-bold">
        알뜰폰 신청을 위해 <br />
        약관에 동의해 주세요
      </h1>
      <div
        className={`${styles.borderStyle} mb-10 border-gray-300 p-[16px] text-[16px]`}
      >
        <div className="flex items-start">
          <div className="flex h-7 items-center">
            <input
              id="agreeAll"
              name={`전체동의`}
              type="checkbox"
              defaultChecked={false}
              onChange={(e: any) => {
                const { checked } = e.target;
                requiredYakgwans.map((v) => {
                  const temp1 = v;
                  temp1.checked = checked;
                  return temp1;
                });
                optionalYakgwans.map((v) => {
                  const temp1 = v;
                  temp1.checked = checked;
                  return temp1;
                });
                setRequiredYakgwans([...requiredYakgwans]);
                setOptionalYakgwans([...optionalYakgwans]);
              }}
              className={`${styles.checkBoxStyle} h-[20px] w-[20px]`}
            />
          </div>
          <div className="ml-[8px]">
            <label
              htmlFor={`agreeAll`}
              className="align-text-top font-medium text-gray-700"
            >
              약관에 모두 동의
            </label>
          </div>
        </div>
      </div>

      <div className="mb-10 space-y-[16px]">
        {requiredYakgwans.map((item: IfYakgwan, index: number) => (
          <div key={index} className="relative flex w-full">
            <div className="flex w-5/6 items-start">
              <div>
                <input
                  id={`requiredYakgwan${index}`}
                  name={`필수약관리스트 ${index}`}
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {
                    const temp = requiredYakgwans as any;
                    temp[index].checked = !item.checked;
                    setRequiredYakgwans([...temp]);
                  }}
                  className={`${styles.checkBoxStyle} h-[20px] w-[20px]`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={`requiredYakgwan${index}`}
                  className="align-text-top font-medium text-gray-700"
                >
                  {item.name}
                </label>
              </div>
            </div>
            <div className="flex w-1/6 flex-col items-end justify-center">
              <Link href={`/yakgwans/${item.value}`}>
                <a target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-[16px] w-[50px] text-gray-500"
                  >
                    <path d="M5.46967 12.4697C5.17678 12.7626 5.17678 13.2374 5.46967 13.5303C5.76256 13.8232 6.23744 13.8232 6.53033 13.5303L5.46967 12.4697ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.53033 2.46967C6.23744 2.17678 5.76256 2.17678 5.46967 2.46967C5.17678 2.76256 5.17678 3.23744 5.46967 3.53033L6.53033 2.46967ZM6.53033 13.5303L11.5303 8.53033L10.4697 7.46967L5.46967 12.4697L6.53033 13.5303ZM11.5303 7.46967L6.53033 2.46967L5.46967 3.53033L10.4697 8.53033L11.5303 7.46967Z" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        ))}
        {optionalYakgwans.map((item: IfYakgwan, index: number) => (
          <div key={index} className="relative flex w-full">
            <div className="flex w-5/6 items-start">
              <div>
                <input
                  id={`optionalYakgwans${index}`}
                  name={`필수약관리스트 ${index}`}
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {
                    const temp = optionalYakgwans as any;
                    temp[index].checked = !item.checked;
                    setOptionalYakgwans([...temp]);
                  }}
                  className={`${styles.checkBoxStyle} h-[20px] w-[20px]`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={`requiredYakgwan${index}`}
                  className="align-text-top font-medium text-gray-700"
                >
                  {item.name}
                </label>
              </div>
            </div>
            <div className="flex w-1/6 flex-col items-end justify-center">
              <Link href={`/yakgwans/${item.value}`}>
                <a target="_blank" rel="noopener noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-[16px] w-[50px] text-gray-500"
                  >
                    <path d="M5.46967 12.4697C5.17678 12.7626 5.17678 13.2374 5.46967 13.5303C5.76256 13.8232 6.23744 13.8232 6.53033 13.5303L5.46967 12.4697ZM11 8L11.5303 8.53033C11.8232 8.23744 11.8232 7.76256 11.5303 7.46967L11 8ZM6.53033 2.46967C6.23744 2.17678 5.76256 2.17678 5.46967 2.46967C5.17678 2.76256 5.17678 3.23744 5.46967 3.53033L6.53033 2.46967ZM6.53033 13.5303L11.5303 8.53033L10.4697 7.46967L5.46967 12.4697L6.53033 13.5303ZM11.5303 7.46967L6.53033 2.46967L5.46967 3.53033L10.4697 8.53033L11.5303 7.46967Z" />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            const isRequiredCheckd = requiredYakgwans.filter(
              (item: IfYakgwan) => !item.checked
            );
            if (isRequiredCheckd.length === 0) {
              // 옵션 저장하고 진행
              setTotal({
                ...total,
                marketing1: optionalYakgwans[0]?.checked,
                marketing2: optionalYakgwans[1]?.checked,
              });
              router.push('./S3JoinType');
            } else {
              alert('필수 항목에 동의해주세요.');
            }
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S2Yakgwan;
