// Coloque aqui suas actions

export const LOGIN = 'LOGIN';
export const STORE_CURRENCY = 'STORE_CURRENCY';
export const STORE_EXPENSES = 'STORE_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

const userAction = (email) => ({
  type: LOGIN,
  payload: email,
});

export const walletActionFetch = (currencies) => ({
  type: STORE_CURRENCY,
  payload: currencies,
});

export const walletExpenseAction = (expenses, apiCambio) => ({
  type: STORE_EXPENSES,
  payload: { ...expenses, exchangeRates: apiCambio },
});

export const walletRemoveAction = (element) => ({
  type: REMOVE_EXPENSE,
  payload: element,
});

export default userAction;
