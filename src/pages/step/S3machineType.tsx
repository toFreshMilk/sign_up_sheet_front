import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { machineModelList } from '@/utils/PublicData';

const S3machineType = () => {
  const router = useRouter();
  const [modelName, setModelName] = useState('');
  return (
    <Main>
      <div className="overflow-hidden">
        <h2 className={`${styles.stepTitle}`}>
          어떤 기기에서 <br /> 사용하는 요금제인가요?
        </h2>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle}`}>모델명</div>
        <select
          value={modelName}
          onChange={(e) => {
            setModelName(e.target.value);
          }}
          className={`${styles.inputBox} w-full`}
        >
          {machineModelList.map((item) => (
            <option key={item.title} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            sessionStorage.setItem(
              'S3machineType',
              JSON.stringify({
                modelName,
              })
            );
            router.push('./S4HowToGetUsim');
          }}
          className={`${styles.nextBtn} flex w-full justify-center mt-[40px]`}
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S3machineType;
