import CryptoJS from 'crypto-js';

const CheckIcon = (props: any) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#120909" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#9d1818"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const encrypt = (val: any) => {
  const text = val.toString();

  const data = {
    id: text,
  };

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'SMTL');

  const result = encrypted.toString();

  return encodeURIComponent(result);
};

export { CheckIcon, encrypt };
