import { setCookie, getCookie, deleteCookie } from "./cookies";
import { RequestCredentialsUpdate, RequestDB, RequestDataToken, RequestIngredients, RequestLogout, RequestOrder, RequestOrderInfo, RequestUser, RequestUserAuth, TUserForm } from "../services/types/data";

export const NORMA_API = 'https://norma.nomoreparties.space/api/';
const PROFILE_FEED_SERVER_URL = "wss://norma.nomoreparties.space/orders";
const FEED_SERVER_URL = "wss://norma.nomoreparties.space/orders/all";

export const getFeedUrl = () => {
  return `${FEED_SERVER_URL}`;
}

export const getProfileFeedUrl = () => {
  const authToken = getCookie('token');

  return `${PROFILE_FEED_SERVER_URL}?token=${authToken}`;
}



export const saveTokens = (refreshToken: string, accessToken: string) => {
  const authToken = accessToken.split('Bearer ')[1];
  setCookie('token', authToken, { path: '/' });
  localStorage.setItem('refreshToken', refreshToken);
}

export const deleteTokens = () => {
  deleteCookie('token');
  localStorage.removeItem('refreshToken');
}

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json() as Promise<T>;
  }
  return Promise.reject({ message: `Ошибка ${res.status} ${res.statusText}` });
};

type checkSuccessProps<T> = RequestDB & T;
const checkSuccess = <T>(res: checkSuccessProps<T>): T | Promise<T> => {
  if (res && res?.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = <T>(endpoint: string, options?: RequestInit | undefined): Promise<T> => {
  return fetch(`${NORMA_API}${endpoint}`, options)
    .then(checkResponse<T>);
  //.then(checkSuccess<T>);
};

export const getIngredients = (): Promise<RequestIngredients> => request("ingredients");

export const getOrder = (data: string[]): Promise<RequestOrder> => request(`orders`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ "ingredients": data })
  });

export const getFeedOrder = (orderNumber: number): Promise<RequestOrderInfo> => request(`orders/${orderNumber}`);


export const loginRequest = (form: TUserForm): Promise<RequestUserAuth> => request(`auth/login`, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset = utf-8'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(form)
});

export const registerRequest = (form: TUserForm): Promise<RequestUserAuth> => request(`auth/register`, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset = utf-8'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(form)
});

export const passwordRecoverRequest = (form: TUserForm): Promise<RequestCredentialsUpdate> => request(`password-reset`, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset = utf-8'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(form)
});

export const passwordResetRequest = (form: TUserForm): Promise<RequestCredentialsUpdate> => request(`password-reset/reset`, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset = utf-8'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(form)
});

export const getUserRequest = (): Promise<RequestUser> => request(`auth/user`, {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Authorization': 'Bearer ' + getCookie('token')
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer'
});

export const updateUserRequest = (form: TUserForm): Promise<RequestUser> => request(`auth/user`, {
  method: 'PATCH',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json; charset = utf-8',
    'Authorization': 'Bearer ' + getCookie('token')
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify(form)
});

export const refreshTokenRequest = (): Promise<RequestDataToken> => request(`auth/token`, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
});

export const logoutRequest = (): Promise<RequestLogout> => request(`auth/logout`, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
});