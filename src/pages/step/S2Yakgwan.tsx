import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';

interface IfYakgwan {
  name: string;
  checked: boolean;
}
const S2Yakgwan = () => {
  const router = useRouter();
  const [requiredYakgwans, setRequiredYakgwans] = useState([
    { name: '개인정보 수집, 이용 동의[필수]', checked: true },
    { name: '서비스 제공을 위한 개인정보 처리위탁 동의[필수]', checked: true },
    { name: '개인신용정보 조회 동의[필수]', checked: true },
    { name: '단말기 할부계약동의[필수]', checked: true },
    { name: '본인인증(본인확인) 서비스 제공 동의[필수]', checked: true },
    { name: '서비스 제공을 위한 제3자 제공 동의[필수]', checked: true },
  ]);
  const [optionalYakgwans, setOptionalYakgwans] = useState([
    { name: '정보광고 전송 동의[선택]', checked: false },
  ]);
  return (
    <Main>
      <h1 className="p-3">약관에 동의해 주세요</h1>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <fieldset>
            <legend className="sr-only">약관 동의</legend>
            <div className="mt-4 space-y-4">
              {requiredYakgwans.map((item: IfYakgwan, index: number) => (
                <div className="flex items-start" key={index}>
                  <div className="flex h-5 items-center">
                    <input
                      id={`requiredYakgwan${index}`}
                      name={`필수약관리스트 ${index}`}
                      type="checkbox"
                      defaultChecked={item.checked}
                      onChange={() => {
                        // @ts-ignore
                        requiredYakgwans[index].checked = !item.checked;
                        setRequiredYakgwans([...requiredYakgwans]);
                      }}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor={`requiredYakgwan${index}`}
                      className="font-medium text-gray-700"
                    >
                      {item.name}
                    </label>
                  </div>
                </div>
              ))}
              {optionalYakgwans.map((item, index) => (
                <div className="flex items-start" key={index}>
                  <div className="flex h-5 items-center">
                    <input
                      id={`optionalYakgwan${index}`}
                      name={`옵션약관리스트 ${index}`}
                      type="checkbox"
                      defaultChecked={item.checked}
                      onChange={() => {
                        // @ts-ignore
                        optionalYakgwans[index].checked = !item.checked;
                        setOptionalYakgwans([...optionalYakgwans]);
                      }}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor={`optionalYakgwan${index}`}
                      className="font-medium text-gray-700"
                    >
                      {item.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
        <div>
          <button
            onClick={() => {
              const isRequiredCheckd = requiredYakgwans.filter(
                (item: IfYakgwan) => !item.checked
              );
              if (isRequiredCheckd.length === 0) {
                // 옵션 저장하고 진행

                const [optionalChecked] = optionalYakgwans.filter(
                  (item: IfYakgwan) => item.checked
                );
                // console.log(optionalChecked?.name);
                const result = { marketing: optionalChecked?.name || '' };
                sessionStorage.setItem('S2Yakgwan', JSON.stringify(result));
                router.push('./S3JoinType');
              } else {
                alert('필수 항목에 동의해주세요.');
              }
            }}
            className="flex w-full justify-center rounded-md border bg-[#32b2df] p-3 font-medium text-white"
          >
            다음
          </button>
        </div>
      </div>
    </Main>
  );
};

export default S2Yakgwan;
