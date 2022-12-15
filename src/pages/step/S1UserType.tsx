import { RadioGroup } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Main } from '@/templates/Main';

const custommerTypes = [
  { name: '일반(만 19세 이상)', inStock: true, checked: true, value: '개인' },
  {
    name: '미성년자(만 19세 미만)',
    inStock: true,
    checked: false,
    value: '미성년자',
  },
  { name: '외국인', inStock: true, checked: false, value: '외국인' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const S1UserType = () => {
  const router = useRouter();
  const [selectedType] = useState(custommerTypes);

  const setSelectedType = (v: any) => {
    sessionStorage.setItem('S1UserType', JSON.stringify(v));
    router.push('./S2Yakgwan');
  };

  return (
    <Main>
      <h1>고객 유형을 선택해 주세요</h1>
      <RadioGroup
        value={selectedType}
        onChange={setSelectedType}
        className="mt-4"
      >
        <RadioGroup.Label className="sr-only"> 유형 선택 </RadioGroup.Label>
        <div className="gap-4">
          {custommerTypes.map((Type) => (
            <RadioGroup.Option
              key={Type.name}
              value={Type}
              disabled={!Type.inStock}
              className={({ active }) =>
                `${classNames(
                  Type.inStock
                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                    : 'bg-gray-50 text-gray-500 cursor-not-allowed',
                  active ? 'ring-2 ring-indigo-500' : '',
                  'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                )} m-10`
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="span">{Type.name}</RadioGroup.Label>
                  {Type.inStock ? (
                    <span
                      className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-md'
                      )}
                      aria-hidden="true"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                    >
                      <svg
                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        stroke="currentColor"
                      >
                        <line
                          x1={0}
                          y1={100}
                          x2={100}
                          y2={0}
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </span>
                  )}
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
