const KcbForm = (props: any) => {
  const { MDL_TKN, CP_CD } = props;
  return (
    <form
      name="saForm2"
      method="post"
      target="sa_popup2"
      action="https://card.ok-name.co.kr/popup/main/start.do"
    >
      <input type="hidden" name="mdlTkn" defaultValue={MDL_TKN} />
      <input type="hidden" name="cpCd" defaultValue={CP_CD} />
    </form>
  );
};
export default KcbForm;
