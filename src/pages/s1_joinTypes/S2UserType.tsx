import { useState } from 'react';

import { Main } from '@/templates/Main';
import { UserInfo } from '@/utils/Swr';

const S2UserType = () => {
  const [yakgwans, setYakgwans] = useState([
    { name: '개인정보 수집, 이용 동의[필수]', checked: true },
    { name: '서비스 제공을 위한 개인정보 처리위탁 동의[필수]', checked: true },
    { name: '개인신용정보 조회 동의[필수]', checked: true },
    { name: '단말기 할부계약동의[필수]', checked: true },
    { name: '본인인증(본인확인) 서비스 제공 동의[필수]', checked: true },
    { name: '서비스 제공을 위한 제3자 제공 동의[필수]', checked: true },
    { name: '정보광고 전송 동의[선택]', checked: false },
  ]);
  const { info, setInfo } = UserInfo();

  const sss = () => {
    console.log(yakgwans);
    // console.log(sessionStorage.getItem('userInfo'));
    // const { info, setInfo } = UserInfo();
    // console.log(info);
    // console.log(setInfo);
    // setInfo(v.name, true);
  };

  return (
    <Main>
      <p onClick={sss}>ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ{info}</p>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <fieldset>
            <legend className="sr-only">약관 동의</legend>
            <h3 className="font-medium text-gray-900" aria-hidden="true">
              약관에 동의해주세요
            </h3>
            <div className="mt-4 space-y-4">
              {yakgwans.map((item, index) => (
                <div className="flex items-start" key={index}>
                  <div className="flex h-5 items-center">
                    <input
                      id={`yakgwan${index}`}
                      name={`약관리스트 ${index}`}
                      type="checkbox"
                      defaultChecked={item.checked}
                      onChange={() => {
                        // @ts-ignore
                        yakgwans[index].checked = !item.checked;
                        setYakgwans([...yakgwans]);
                      }}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor={`yakgwan${index}`}
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
      </div>
    </Main>
  );
};

export default S2UserType;
