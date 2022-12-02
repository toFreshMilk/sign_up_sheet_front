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

export default CheckIcon;
