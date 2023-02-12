import { RadioGroup } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';

const custommerTypes = [
  {
    name: '일반 (만 19세 이상)',
    inStock: true,
    checked: true,
    value: '개인',
    inqDvcd: 'REGID',
  },
  {
    name: '미성년자 (만 19세 미만)',
    inStock: true,
    checked: false,
    value: '미성년자',
    inqDvcd: 'REGID',
  },
  {
    name: '외국인',
    inStock: true,
    checked: false,
    value: '외국인',
    inqDvcd: 'FORGN',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const S1UserType = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [selectedType] = useState(custommerTypes);
  const setSelectedType = (v: any) => {
    setTotal({ ...total, S1UserType: v });
    router.push('./S2Yakgwan');
  };

  return (
    <Main>
      <h1 className="mb-5 flex items-start font-bold">
        고객 유형을 선택해 주세요
      </h1>
      <RadioGroup value={selectedType} onChange={setSelectedType}>
        <RadioGroup.Label className="sr-only"> 유형 선택 </RadioGroup.Label>
        <div className="border-x border-t border-bw50 text-lg">
          {custommerTypes.map((Type) => (
            <RadioGroup.Option
              key={Type.name}
              value={Type}
              disabled={!Type.inStock}
              className={() =>
                `${classNames(
                  'group relative py-4 px-6 border-b border-bw50 flex ' +
                    'items-start font-medium hover:bg-gray-300 hover:cursor-pointer'
                )}`
              }
            >
              {() => (
                <>
                  <RadioGroup.Label as="span">{Type.name}</RadioGroup.Label>
                  <span aria-hidden="true" />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </Main>
  );
};

export default S1UserType;
