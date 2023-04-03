import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';

import styles from '@/styles/utils.module.css';
import { Main } from '@/templates/Main';
import { Context } from '@/utils/Context';
import { machineCapaList, machineModelList } from '@/utils/PublicData';

const S4EsimInfo = () => {
  const router = useRouter();
  const { total, setTotal } = useContext(Context) as any;
  const [machineModelName, setMmchineModelName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [serial, setSerial] = useState('');
  const [showHowToSeeUsim, setShowHowToSeeUsim] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [showSelect2, setShowSelect2] = useState(false);
  const [eid, setEid] = useState('');
  const [imei, setImei] = useState('');
  const [imei2, setImei2] = useState('');
  useEffect(() => {
    setShowSelect(true);
    setShowSelect2(true);
    setMmchineModelName(total.machineModelName);
  }, []);
  return (
    <Main>
      <div className="overflow-hidden">
        <h2 className={`${styles.stepTitle}`}>
          eSim 개통을 위해 <br /> 휴대폰 정보를 입력해주세요
        </h2>
        <br className={'mt-[32px]'} />
        <button
          onClick={() => {
            setShowHowToSeeUsim(true);
          }}
          className={`${styles.customerTypeBtn} ${styles.customerTypeBtnOn}`}
        >
          <div>단말정보 보는법</div>
        </button>
        <Modal
          isOpen={showHowToSeeUsim}
          ariaHideApp={false}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <img
            src={`${router.basePath}/assets/images/seeMachineInfo.png`}
            alt={'이미지'}
            onClick={() => {
              setShowHowToSeeUsim(false);
            }}
          />
        </Modal>
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle} mt-6`}>모델명</div>
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
                setMmchineModelName(v.label);
              }}
            />
          ) : null}
        </div>
        <div className={`${styles.usimSubTitle} mt-6`}>용량</div>
        <div className={'relative'}>
          {showSelect2 ? (
            <Select
              options={machineCapaList}
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
                setCapacity(v.label);
              }}
            />
          ) : null}
        </div>
        <div className={`${styles.usimSubTitle} mt-10`}>일련번호</div>
        <input
          className={`${styles.inputBox} w-full`}
          placeholder="예) DV2F3T4DFV"
          value={serial}
          type="text"
          onChange={(e) => {
            setSerial(e.target.value);
          }}
        />
        <br className={'mt-[32px]'} />
        <div className={`${styles.usimSubTitle} mt-6`}>EID</div>
        <input
          className={`${styles.inputBox} w-full`}
          maxLength={32}
          placeholder={'EID'}
          value={eid}
          onChange={(e) => {
            setEid(e.target.value);
          }}
          type="text"
        />
        <div className={`${styles.usimSubTitle} mt-6`}>IMEI</div>
        <input
          className={`${styles.inputBox} w-full`}
          maxLength={15}
          placeholder={'IMEI'}
          value={imei}
          onChange={(e) => {
            setImei(e.target.value);
          }}
          type="text"
        />
        <div className={`${styles.usimSubTitle} mt-6`}>IMEI2</div>
        <input
          className={`${styles.inputBox} w-full`}
          maxLength={15}
          placeholder={'IMEI2'}
          value={imei2}
          onChange={(e) => {
            setImei2(e.target.value);
          }}
          type="text"
        />
        <button
          disabled={
            eid.length !== 32 || imei.length !== 15 || imei2.length !== 15
          }
          onClick={() => {
            setTotal({
              ...total,
              machineModelName,
              capacity,
              serial,
              eid,
              imei,
              imei2,
            });
            router.push('./S5MobileInfo');
          }}
          className={`${styles.nextBtn} mt-[40px] flex w-full justify-center`}
        >
          다음 단계로
        </button>
      </div>
    </Main>
  );
};

export default S4EsimInfo;
