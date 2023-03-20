import { setCookie, getCookie, deleteCookie } from "./cookies";

const NORMA_API = 'https://norma.nomoreparties.space/api';

async function getIngredients() {
  const res = await fetch(`${NORMA_API}/ingredients`);
  return checkReponse(res);
}

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const saveTokens = (refreshToken, accessToken) => {
  const authToken = accessToken.split('Bearer ')[1];
  setCookie('token', authToken, { path: '/' });
  localStorage.setItem('refreshToken', refreshToken);
}

const deleteTokens = () => {
  deleteCookie('token');
  localStorage.removeItem('refreshToken');
}

async function getOrder(data) {
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

const loginRequest = async (form) => {
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

const registerRequest = async (form) => {
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

const passwordRecoverRequest = async (form) => {
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

const passwordResetRequest = async (form) => {
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

export const getUserRequest = async () => {
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

const updateUserRequest = async (form) => {
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

const refreshTokenRequest = async () => {
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

const logoutRequest = async () => {
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