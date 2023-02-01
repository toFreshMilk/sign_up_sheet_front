import { yakgwanStyle } from '@/styles/InlineCss';

const Yakgwan5 = () => {
  return (
    <div className="text-center">
      <textarea readOnly={true} style={yakgwanStyle}>
        ㈜스마텔은 휴대폰본인인증(본인확인)서비스 제공을 위하여 고객님의 개인정보(성명, 성별, 생년월일, 휴대폰번호, 내/외국인 여부, 계약을 체결한 이동통신사의 HOST MNO, 본인확인식별에 필요한 이용자의 정보(주민등록번호, 외국인등록번호))를서비스 가입기간 동안 본인확인기관으로 지정된 ㈜SK텔레콤, ㈜LG유플러스에게 제공합니다.
      </textarea>
    </div>
  );
};

export default Yakgwan5;
