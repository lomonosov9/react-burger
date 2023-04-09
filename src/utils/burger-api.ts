import { setCookie, getCookie, deleteCookie } from "./cookies";
import { RequestCredentialsUpdate, RequestDataToken, RequestIngredients, RequestLogout, RequestOrder, RequestUser, RequestUserAuth } from "./types";

const NORMA_API = 'https://norma.nomoreparties.space/api';


const saveTokens = (refreshToken: string, accessToken: string) => {
  const authToken = accessToken.split('Bearer ')[1];
  setCookie('token', authToken, { path: '/' });
  localStorage.setItem('refreshToken', refreshToken);
}

const deleteTokens = () => {
  deleteCookie('token');
  localStorage.removeItem('refreshToken');
}

const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

async function getIngredients(): Promise<RequestIngredients> {
  const res = await fetch(`${NORMA_API}/ingredients`);
  return checkReponse(res);
}

async function getOrder(data: string[]): Promise<RequestOrder> {
  const res = await fetch(`${NORMA_API}/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({ "ingredients": data })
    });
  return checkReponse(res);
}

const loginRequest = async (form: { email: string, password: string }): Promise<RequestUserAuth> => {
  const res = await fetch(`${NORMA_API}/auth/login`, {
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
  return checkReponse(res);
};

const registerRequest = async (form: {name: string,  email: string,  password: string}): Promise<RequestUserAuth> => {
  const res = await fetch(`${NORMA_API}/auth/register`, {
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
  return checkReponse(res);
};

const passwordRecoverRequest = async (form: { email: string }): Promise<RequestCredentialsUpdate> => {
  const res = await fetch(`${NORMA_API}/password-reset`, {
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
  return checkReponse(res);
};

const passwordResetRequest = async (form: { password: string, token: string }): Promise<RequestCredentialsUpdate> => {
  const res = await fetch(`${NORMA_API}/password-reset/reset`, {
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
  return checkReponse(res);
};

export const getUserRequest = async (): Promise<RequestUser> => {
  const res = await fetch(`${NORMA_API}/auth/user`, {
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
  return checkReponse(res);
}

const updateUserRequest = async (form:{ name: string, email: string, password: string }) : Promise<RequestUser> => {
  const res = await fetch(`${NORMA_API}/auth/user`, {
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
  return checkReponse(res);
};

const refreshTokenRequest = async (): Promise<RequestDataToken> => {
  const res = await fetch(`${NORMA_API}/auth/token`, {
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
  return checkReponse(res);
};

const logoutRequest = async (): Promise<RequestLogout> => {
  const res = await fetch(`${NORMA_API}/auth/logout`, {
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
  return checkReponse(res);
};

export {
  getIngredients, getOrder, loginRequest, registerRequest,
  updateUserRequest, refreshTokenRequest, logoutRequest,
  saveTokens, deleteTokens,
  passwordRecoverRequest, passwordResetRequest
};