const driverLicenceRegion = [
  { name: '서울[11]', value: '11', disabled: false },
  { name: '부산[12]', value: '12', disabled: false },
  { name: '경기[13]', value: '13', disabled: false },
  { name: '강원[14]', value: '14', disabled: false },
  { name: '충북[15]', value: '15', disabled: false },
  { name: '충남[16]', value: '16', disabled: false },
  { name: '전북[17]', value: '17', disabled: false },
  { name: '전남[18]', value: '18', disabled: false },
  { name: '경북[19]', value: '19', disabled: false },
  { name: '경남[20]', value: '20', disabled: false },
  { name: '제주[21]', value: '21', disabled: false },
  { name: '대구[22]', value: '22', disabled: false },
  { name: '인천[23]', value: '23', disabled: false },
  { name: '광주[24]', value: '24', disabled: false },
  { name: '대전[25]', value: '25', disabled: false },
  { name: '울산[26]', value: '26', disabled: false },
  { name: '경기북부[28]', value: '28', disabled: false },
];
const bankList = [
  { name: '산업은행', value: '02', disabled: false },
  { name: '기업은행', value: '03', disabled: false },
  { name: '국민은행', value: '04', disabled: false },
  { name: '수협중앙회', value: '11', disabled: false },
  { name: '지역농축협(단위 농협)', value: '12', disabled: false },
  { name: '우리은행', value: '20', disabled: false },
  { name: 'SC은행', value: '23', disabled: false },
  { name: '한국씨티은행', value: '27', disabled: false },
  { name: '대구은행', value: '31', disabled: false },
  { name: '부산은행', value: '32', disabled: false },
  { name: '광주은행', value: '34', disabled: false },
  { name: '제주은행', value: '33', disabled: false },
  { name: '전북은행', value: '37', disabled: false },
  { name: '새마을금고중앙회', value: '45', disabled: false },
  { name: '신협중앙회', value: '48', disabled: false },
  { name: '상호저축은행', value: '50', disabled: false },
  { name: 'HSBC은행', value: '54', disabled: false },
  { name: '우체국', value: '71', disabled: false },
  { name: 'KEB하나은행', value: '81', disabled: false },
  { name: '신한은행', value: '88', disabled: false },
  { name: '케이뱅크', value: '89', disabled: false },
  { name: '카카오뱅크', value: '90', disabled: false },
];
const cardList = [
  { title: 'BC카드', disabled: false },
  { title: '국민카드', disabled: false },
  { title: '농협카드', disabled: false },
  { title: '롯데카드', disabled: true },
  { title: '삼성카드', disabled: true },
  { title: '신한카드', disabled: true },
  { title: '하나카드', disabled: true },
  { title: '현대카드', disabled: true },
  { title: '카카오카드', disabled: true },
  { title: '우체국카드', disabled: true },
  { title: 'K뱅크', disabled: true },
  { title: '아멕스카드', disabled: true },
  { title: '씨티카드', disabled: true },
  { title: '기타카드', disabled: true },
  { title: '우리카드', disabled: true },
];
const alttleTelecomList = [
  { title: '[SK망]SK 7모바일(SK텔링크)', disabled: false },
  { title: '[SK망]LG헬로모바일', disabled: true },
  { title: '[SK망]스마텔', disabled: true },
  { title: '[SK망]이야기 알뜰폰', disabled: true },
  { title: '[SK망]프리텔레콤', disabled: true },
  { title: '[SK망]에스원안심모바일', disabled: true },
  { title: '[SK망]유니컴즈', disabled: true },
  { title: '[SK망]아이즈모바일', disabled: true },
  { title: '[SK망]T플러스', disabled: true },
  { title: '[SK망]마이월드(SKT망)', disabled: true },
  { title: '[SK망]이마트(SKT망)', disabled: true },
  { title: '[SK망]조이텔(SKT망)', disabled: true },
  { title: '[KT망]KT M모바일', disabled: true },
  { title: '[KT망]에넥스텔레콤', disabled: true },
  { title: '[KT망]LG헬로모바일', disabled: true },
  { title: '[KT망]스마텔', disabled: true },
  { title: '[KT망]프리텔레콤', disabled: true },
  { title: '[KT망]세종텔레콤', disabled: true },
  { title: '[KT망]유니컴즈', disabled: true },
  { title: '[KT망]에스원안심모바일', disabled: true },
  { title: '[KT망]드림모바일', disabled: true },
  { title: '[KT망]위너스텔', disabled: true },
  { title: '[KT망]앤텔레콤', disabled: true },
  { title: '[KT망]CNcom', disabled: true },
  { title: '[KT망]코드모바일', disabled: true },
  { title: '[KT망]KT파워텔', disabled: true },
  { title: '[KT망]에스로밍', disabled: true },
  { title: '[KT망]홈플러스(KT망)', disabled: true },
  { title: '[KT망]에이씨엔코리아(KT망)', disabled: true },
  { title: '[KT망]착한통신', disabled: true },
  { title: '[KT망]케이티스', disabled: true },
  { title: '[KT망]장성모바일한국', disabled: true },
  { title: '[KT망]아이즈비전(KT망)', disabled: true },
  { title: '[KT망]머천드코리아(KT망)', disabled: true },
  { title: '[KT망]제이씨티', disabled: true },
  { title: '[KT망]미니케이트', disabled: true },
  { title: '[KT망]아이원', disabled: true },
  { title: '[KT망]핀플레이(KT망)', disabled: true },
  { title: '[KT망]파인디지털', disabled: true },
  { title: '[KT망]KCT(KT망)', disabled: true },
  { title: '[KT망]이비카드(KT망)', disabled: true },
  { title: '[KT망]와이엘랜드', disabled: true },
  { title: '[KT망]큰사람KT', disabled: true },
  { title: '[KT망]니즈텔레콤(KT망)', disabled: true },
  { title: '[KT망]케이티스카이라이프(KT망)', disabled: true },
  { title: '[KT망]에이프러스', disabled: true },
  { title: '[KT망]케이티엠모바일', disabled: true },
  { title: '[U+망]유플러스 알뜰 모바일', disabled: true },
  { title: '[U+망]스마텔', disabled: true },
  { title: '[U+망]이야기알뜰폰', disabled: true },
  { title: '[U+망]에넥스텔레콤', disabled: true },
  { title: '[U+망]프리텔레콤(인스코비)', disabled: true },
  { title: '[U+망]LG헬로모바일', disabled: true },
  { title: '[U+망]유니컴즈', disabled: true },
  { title: '[U+망]리브모바일', disabled: true },
  { title: '[U+망]아이즈모바일', disabled: true },
  { title: '[U+망]머천드코리아', disabled: true },
  { title: '[U+망]에스원안심모바일', disabled: true },
  { title: '[U+망]MTT', disabled: true },
  { title: '[U+망]대성홀딩스', disabled: true },
  { title: '[U+망]알뜰폰', disabled: true },
  { title: '[U+망]에이씨엔코리아(U+망)', disabled: true },
  { title: '[U+망]레그원', disabled: true },
  { title: '[U+망]도시락모바일(U+망)', disabled: true },
  { title: '[U+망]세종텔레콤(U+망)', disabled: true },
  { title: '[U+망]홈플러스(U+망)', disabled: true },
  { title: '[U+망]이마트(U+망)', disabled: true },
  { title: '[U+망]서경방송', disabled: true },
  { title: '[U+망]울산방송', disabled: true },
  { title: '[U+망]푸른방송', disabled: true },
  { title: '[U+망]남인천방송', disabled: true },
  { title: '[U+망]금강방송', disabled: true },
  { title: '[U+망]제주방송', disabled: true },
  { title: '[U+망]여유텔레콤(U+망)', disabled: true },
  { title: '[U+망]이지모바일(U+망)', disabled: true },
  { title: '[U+망]케이디디아이코리아(U+망)', disabled: true },
  { title: '[U+망]휴엘컴퍼니(U+망)', disabled: true },
  { title: '[U+망]조이텔(U+망)', disabled: true },
  { title: '[U+망]핀플레이(U+망)', disabled: true },
  { title: '[U+망]원텔레콤(U+망)', disabled: true },
  { title: '[U+망]핀샷(U+망)', disabled: true },
  { title: '[U+망]화인통신(U+망)', disabled: true },
  { title: '[U+망]KPMOLG', disabled: true },
  { title: '[U+망]엔티온텔레콤(U+망)', disabled: true },
  { title: '[U+망]인스코리아(U+망)', disabled: true },
  { title: '한국케이블텔레콤', disabled: true },
  { title: '온세텔레콤', disabled: true },
  { title: '기타 통신사', disabled: true },
];
const machineModelList = [
  { label: '갤럭시 Z Flip 4', value: '갤럭시 Z Flip 4', rating: 'safe' },
  { label: '갤럭시 Z Fold 4', value: '갤럭시 Z Fold 4', rating: 'safe' },
  { label: 'iPhone14 Pro Max', value: 'iPhone14 Pro Max', rating: 'safe' },
  { label: 'iPhone14 Pro', value: 'iPhone14 Pro', rating: 'safe' },
  { label: 'iPhone14 Plus', value: 'iPhone14 Plus', rating: 'safe' },
  { label: 'iPhone14', value: 'iPhone14', rating: 'safe' },
  { label: 'iPhone13 Pro Max', value: 'iPhone13 Pro Max', rating: 'safe' },
  { label: 'iPhone13 Pro', value: 'iPhone13 Pro', rating: 'safe' },
  { label: 'iPhone13', value: 'iPhone13', rating: 'safe' },
  { label: 'iPhone13 mini', value: 'iPhone13 mini', rating: 'safe' },
  { label: 'iPhone12 Pro Max', value: 'iPhone12 Pro Max', rating: 'safe' },
  { label: 'iPhone12 Pro', value: 'iPhone12 Pro', rating: 'safe' },
  { label: 'iPhone12', value: 'iPhone12', rating: 'safe' },
  { label: 'iPhone12 mini', value: 'iPhone12 mini', rating: 'safe' },
  { label: 'iPhone SE 3세대', value: 'iPhone SE 3세대', rating: 'safe' },
  { label: 'iPhone11 Pro', value: 'iPhone11 Pro', rating: 'safe' },
  { label: 'iPhone11', value: 'iPhone11', rating: 'safe' },
  { label: 'iPhone11 mini', value: 'iPhone11 mini', rating: 'safe' },
  { label: 'iPhone XR', value: 'iPhone XR', rating: 'safe' },
  { label: 'iPhone XS MAX', value: 'iPhone XS MAX', rating: 'safe' },
  { label: 'iPhone XS', value: 'iPhone XS', rating: 'safe' },
  { label: '그 외', value: '그 외', rating: 'safe' },
];
const difficultNaverList = [
  {
    title: '아이콘을 눌러도 반응이 없어요',
    subTitle: (
      <>
        인증서가 없는 네이버 ID로 로그인 되어 있으면 인증이 제대로 작동하지 않아요. 다른 브라우저에서 시도해 주시거나, 네이버 로그인을 다시 진행해 주세요.
      </>
    ),
    checked: true,
  },
  {
    title: '"본인 명의의 계정으로 인증해 주세요" 라고 나와요',
    subTitle: (
      <>
        앞서 입력하신 본인 명의의 네이버 인증서로 인증해야 해요. 다른
        브라우저에서 시도해 주시거나, 아래 페이지에서 서비스 연동을 철회하고
        다시 시도해 주세요.
        <br />
        <br />
        <a
          href="https://nid.naver.com/user2/help/externalAuth?lang=ko_KR"
          target="_blank"
          className="inline text-[14px] text-[#adafb2] hover:underline"
          rel="noreferrer"
        >
          https://nid.naver.com/user2/help/externalAuth?lang=ko_KR
        </a>
      </>
    ),
    checked: false,
  },
  {
    title: '인증에 실패했다고 나와요',
    subTitle: (
      <>
        핸드폰 잠금 정보가 달라졌거나 앱을 재설치했다면 인증서를 재발급 받아야
        해요. 만료된 인증서로는 인증받을 수 없어요.
        <br />
        <br />
        핸드폰 기기의 시간과 실제 시간이 같은지 확인해 주세요. 다르면 인증할 수
        없어요.
      </>
    ),
    checked: false,
  },
  {
    title: '인증하기를 눌렀는데 알림이 안 와요',
    subTitle: (
      <>
        인증 시 로그인한 ID와 동일한 ID로 네이버 앱에 로그인 중인지, 알림이 켜져
        있는지 확인해 주세요. 알림은 네이버 앱을 켜고 오른쪽 상단에 종 모양을
        클릭하면 확인할 수 있어요.
      </>
    ),
    checked: false,
  },
  {
    title: '인증서가 있는데 재발급하라고 떠요',
    subTitle: (
      <>
        인증서 발급 후에 앱을 재설치 했거나, 핸드폰 잠금 정보가 달라지면 인증서를 재발급 받아야 해요.
      </>
    ),
    checked: false,
  },
  {
    title: '인증을 했는데 다음 단계로 안 넘어가요',
    subTitle: (
      <>
        신청하시는 분의 명의와 인증서 명의가 다르면 신청을 진행할 수 없어요.
        같은 명의의 인증서로 진행해 주세요.
      </>
    ),
    checked: false,
  },
  {
    title: '다른 네이버 ID로 로그인하고 싶어요',
    subTitle: (
      <>
        브라우저에 이미 로그인이 되어 있다면 자동으로 로그인이 되어 있어요.
        로그아웃 하거나 다른 브라우저로 신청해 주세요.
      </>
    ),
    checked: false,
  },
  {
    title: '일시적인 오류라고 뜨고 인증이 안돼요',
    subTitle: (
      <>
        기기를 교체했거나 iCloud 등에 백업된 앱이 자동으로 설치됐다면 앱을
        삭제하고 스토어에서 다시 설치해 주세요.
      </>
    ),
    checked: false,
  },
  {
    title: '2단계 인증 요청이 거부되었다고 떠요',
    subTitle: <>네이버 앱이 최신 버전인지 확인하고 업데이트를 해주세요.</>,
    checked: false,
  },
  {
    title: '인증 시간을 초과했어요',
    subTitle: <>네이버 아이콘을 다시 눌러서 인증을 진행해 주세요.</>,
    checked: false,
  },
];
const difficultTossList = [
  {
    title: '아이콘을 눌러도 반응이 없어요',
    subTitle: <>토스 앱이 설치되어 있나요? 최신 버전의 토스 앱이 필요해요.</>,
    checked: true,
  },
  {
    title: '인증하기를 눌렀는데 알림이 안 와요',
    subTitle: (
      <>
        알림 설정이 꺼져있지는 않나요? 토스 앱을 켜서 오른쪽 상단에 종 모양을
        클릭해서 인증을 진행해 주세요.
      </>
    ),
    checked: false,
  },
  {
    title: '요청이 만료되었다고 떠요',
    subTitle: (
      <>
        인증 가능한 시간이 지났기 때문이에요. 토스 아이콘을 다시 눌러서 인증을
        다시 시도해 주세요.
      </>
    ),
    checked: false,
  },
  {
    title: '"본인 명의의 계정으로 인증해 주세요" 라고 나와요',
    subTitle: (
      <>
        신청하시는 분의 명의와 인증서 명의가 다르면 신청을 진행할 수 없어요.
        신청자 본인 명의의 토스 계정으로 진행해 주세요.
      </>
    ),
    checked: false,
  },
];
const difficultCardList = [
  {
    title: '체크카드 인증은 할 수 없나요?',
    subTitle: (
      <>
        본인인증은 신용카드만 지원하고 있어요. 본인 명의의 신용카드로 인증을
        진행해 주세요.
      </>
    ),
    checked: true,
  },
  {
    title: '"본인 명의의 계정으로 인증해 주세요" 라고 나와요',
    subTitle: (
      <>
        신청하시는 분의 명의와 신용카드 명의가 다르면 신청을 진행할 수 없어요.
        신청자 본인 명의의 신용카드로 진행해 주세요.
      </>
    ),
    checked: false,
  },
];
export {
  alttleTelecomList,
  bankList,
  cardList,
  difficultCardList,
  difficultNaverList,
  difficultTossList,
  driverLicenceRegion,
  machineModelList,
};
