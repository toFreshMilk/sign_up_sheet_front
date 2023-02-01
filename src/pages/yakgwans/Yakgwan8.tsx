import { yakgwanStyle } from '@/styles/InlineCss';

const Yakgwan8 = () => {
  return (
    <div className="flex justify-center">
      <div style={yakgwanStyle}>
        <table style={{ border: '1px solid #333', padding: '5px', color: '#888', marginBottom: '20px'}}>
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <tbody>
          <tr>
            <th>수집·이용목적</th>
            <th>수집·이용항목</th>
            <th>처리 및 보유기간</th>
          </tr>
          <tr>
            <td>신규서비스 제공 및 광고를 의뢰하는 업체의 광고성 정보를 전화, 전자우편, SMS, LMS, MMS 등을 이용</td>
            <td>이동전화번호, 주소, 전화번호, 연락가능한번호, e-mail, 고객이 상담내용에 입력하는 개인정보</td>
            <td rowSpan={2}>가입기간 종료 시, 또는 고객의 동의 철회 시 단, 위치정보 보유기간은 본 광고서비스의 이용으로 인한 불만 응대 등의 목적으로 3개월간 보관</td>
          </tr>
          <tr>
            <td>위치정보 및 개인정보를 활용하여 해외로밍 안내, 생활정보 이벤트 및 할인쿠폰 등 다양한 혜택정보를 SMS,LMS,MMS,WAP push, 이메일, 우편, 어플안내, 팝업 등의 방식으로
              전송하는데 이용
            </td>
            <td>이동전화번호, 주소, 전화번호, 연락가능한번호, e-mail, 고객이 상담내용에 입력하는 개인정보, 위치정보(기지국 위치, GPS, Wifi, RFID테그 및 변경정보 포함)</td>
          </tr>
          </tbody>
          </table>

        <div style={{ textAlign: 'left' }}>
          ※ 위 정보는 가입당시 정보뿐만 아니라 정보수정으로 변경된 정보를 포함합니다.
          <br />
          ※ 단, 고유식별정보는 가입의사확인, 명의도용 방지, 미환급금 반환, 복지할인, 본인확인서비스, 단말기 분할상환 대금채권 등을 기초자산으로 한 자산유동화거래 목적과 같이 법적 근거가 있는 경우만 제한적으로 이용합니다.
        </div>
      </div>
    </div>
  );
};

export default Yakgwan8;
