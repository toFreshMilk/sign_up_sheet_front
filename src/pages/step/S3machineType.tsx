import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { machineModelList } from '@/utils/PublicData';

const S3machineType = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [showSelect, setShowSelect] = useState(false);
  const [modelName, setModelName] = useState('');
  useEffect(() => {
    setShowSelect(true);
  }, []);

  return (
    <Main>
      <div className="overflow-hidden">
        <h2 className={`${styles.stepTitle}`}>
          어떤 기기에서 <br /> 사용하는 요금제인가요?
        </h2>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle}`}>모델명</div>
        <div className={'relative'}>
          {showSelect ? (
            <Select
              options={machineModelList}
              defaultValue={{
                value: '선택',
                label: '선택',
                rating: 'safe',
              }}
              classNamePrefix={'selectPrefix'}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              name={'dd'}
              onChange={(v: any) => {
                setModelName(v.label);
              }}
            />
          ) : null}
        </div>
        <button
          onClick={() => {
            setTotal({ ...total, modelName });
            router.push('./S4HowToGetUsim');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음
        </button>
      </div>
    </Main>
  );
};

export default S3machineType;
