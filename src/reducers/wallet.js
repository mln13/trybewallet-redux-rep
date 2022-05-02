// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REMOVE_EXPENSE, STORE_CURRENCY, STORE_EXPENSES } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case STORE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length,
          ...action.payload }],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.payload.id),
    };
  default:
    return state;
  }
};

export default wallet;
