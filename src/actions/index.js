// Coloque aqui suas actions

export const LOGIN = 'LOGIN';
export const STORE_CURRENCY = 'STORE_CURRENCY';

const userAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export const walletActionFetch = (currencies) => ({
  type: STORE_CURRENCY,
  payload: currencies,
});
export default userAction;
