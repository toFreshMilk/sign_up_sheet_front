import useSWR from 'swr';

// 일단은 window에 담고 스토리지에 담을지는 좀 보자
declare global {
  interface Window {
    token: any;
    userInfo: any;
  }
}

// const swrToken = () => {
//   const { data, mutate } = SWR('token', () => window.token);
//   const token = data;
//   const setToken = mutate;
//   return {
//     token,
//     setToken: (_token: string) => {
//       window.token = _token;
//       return setToken();
//     },
//   };
// };

const UserInfo = () => {
  const { data, mutate } = useSWR('/userInfo', () => window.userInfo);
  const info = data;
  const setInfo = mutate;
  return {
    info,
    setInfo: (_info: string, _bool: boolean) => {
      window.userInfo = _info;
      return setInfo(_info, _bool);
    },
  };
};

export { UserInfo };
