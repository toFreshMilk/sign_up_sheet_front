import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';

import { Main } from '@/templates/Main';
import { UserInfo } from '@/utils/Swr';

const custommerTypes = [
  { name: '일반(만 19세 이상)', inStock: true },
  { name: '미성년자(만 19세 미만)', inStock: true },
  { name: '외국인', inStock: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const S2UserType = () => {
  const [selectedType] = useState(custommerTypes[0]);
  const { info, setInfo } = UserInfo();

  const setSelectedType = (v: any) => {
    console.log(info);
    // const { info, setInfo } = UserInfo();
    // console.log(info);
    // console.log(setInfo);
    // setInfo(v.name, true);
  };

  return (
    <Main>
      <p>ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ{info}</p>
      <RadioGroup
        value={selectedType}
        onChange={setSelectedType}
        className="mt-4"
      >
        <RadioGroup.Label className="sr-only"> Choose a type </RadioGroup.Label>
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

export default S2UserType;
