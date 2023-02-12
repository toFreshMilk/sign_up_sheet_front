import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { machineModelList } from '@/utils/PublicData';

interface ModelObj {
  title: string;
  disabled: boolean;
}

const S3machineType = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [modelName, setModelName] = useState('');
  const [modelList, setModelList] = useState<ModelObj[]>([
    { title: '선택', disabled: false },
  ]);
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
          onClick={() => {
            setModelList(machineModelList);
          }}
          onChange={(e) => {
            setModelName(e.target.value);
          }}
          className={`${styles.inputBox} w-full`}
        >
          {modelList.map((item) => (
            <option key={item.title} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setTotal({ ...total, S3machineType: modelName });
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
