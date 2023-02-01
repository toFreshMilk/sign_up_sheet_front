import { yakgwanStyle } from '@/styles/InlineCss';

const Yakgwan7 = () => {
  return (
    <div className="text-center">
      <textarea readOnly={true} style={yakgwanStyle}>
        본인이 수집 및 이용에 동의한 개인정보를 활용하여, 귀사가 본인에게 전자적 전송매체를 통해 광고ㆍ홍보ㆍ프로모션ㆍ이벤트 제공 목적으로, 스마텔㈜ 및 제3자의 상품 또는 서비스에 대한 개인 맞춤형 광고ㆍ정보를 전송하는 것과 이와 관련한 개인정보처리를 위탁하는 것을 동의합니다.(동의를 거부할 수 있으며, 거부에 따른 불이익은 없습니다.)
      </textarea>
    </div>
  );
};

export default Yakgwan7;
