import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requestAPI from '../Api/Api';
import { walletActionFetch } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.totalExpenses = this.totalExpenses.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleSelectOptions = this.handleSelectOptions.bind(this);
  }

  componentDidMount() {
    const { storeCurrencies } = this.props;
    this.fetchAPI().then((data) => {
      const listOfCurrencies = Object.keys(data);
      const filteredListOfCurriences = listOfCurrencies.filter((key) => (key !== 'USDT'));
      storeCurrencies(filteredListOfCurriences);
      this.handleSelectOptions();
    });
  }

  totalExpenses(expenses, amount) {
    const total = amount - expenses;
    return total;
  }

  async fetchAPI() {
    const currencies = await requestAPI();
    return currencies;
  }

  handleSelectOptions() {
    const { propsCurrency } = this.props;
    return propsCurrency
      .map((element) => <option key={ element } name={ element }>{element}</option>);
  }

  render() {
    const { propsEmail } = this.props;
    return (
      <div>
        <header
          data-testid="email-field"
        >
          Email:
          {propsEmail.email}
          <div
            data-testid="total-field"
          >
            Despesa Total:
            {this.totalExpenses(0, 0)}
          </div>
          <div
            data-testid="header-currency-field"
          >
            BRL
          </div>
        </header>
        <form>
          <label htmlFor="valueID">
            Valor:
            <input
              id="valueID"
              data-testid="value-input"
              type="number"
            />
          </label>
          <label htmlFor="descriptionID">
            Descrição
            <input
              id="descriptionID"
              data-testid="description-input"
              type="text"
            />
          </label>
          <label htmlFor="currencyID">
            Moeda
            <select
              name="Moeda"
              id="currencyID"
              data-testid="currency-input"
            >
              {this.handleSelectOptions()}
            </select>
          </label>
          <label htmlFor="methodID">
            Método de pagamento
            <select
              id="methodID"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tagID">
            Categoria
            <select
              id="tagID"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  propsEmail: PropTypes.objectOf.isRequired,
  storeCurrencies: PropTypes.func.isRequired,
  propsCurrency: PropTypes.arrayOf.isRequired,
};

function mapStateToProps(state) {
  return {
    propsEmail: state.user,
    propsCurrency: state.wallet.currencies,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    storeCurrencies: (currencies) => dispatch(walletActionFetch(currencies)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
