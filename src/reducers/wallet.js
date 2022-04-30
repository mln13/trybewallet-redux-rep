// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { STORE_CURRENCY } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case STORE_CURRENCY:
    console.log('case', { action });
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
