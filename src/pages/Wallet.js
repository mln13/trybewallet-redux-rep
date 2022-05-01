import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requestAPI from '../Api/Api';
import { walletActionFetch } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      categoria: 'Alimentação',
    };
    this.totalExpenses = this.totalExpenses.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleSelectOptions = this.handleSelectOptions.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.submitClick = this.submitClick.bind(this);
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

  handleForm({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  submitClick() {

  }

  render() {
    const { propsEmail } = this.props;
    const { value, currency, categoria, description, method } = this.state;
    return (
      <div>
        <header
          data-testid="email-field"
        >
          Email:
          {propsEmail.email}
          <span
            data-testid="total-field"
          >
            Despesa Total:
            {this.totalExpenses(0, 0)}
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </header>
        <form>
          <label htmlFor="valueID">
            Valor:
            <input
              id="valueID"
              name="value"
              value={ value }
              type="number"
              onChange={ this.handleForm }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="descriptionID">
            Descrição
            <input
              id="descriptionID"
              type="text"
              value={ description }
              name="description"
              data-testid="description-input"
              onChange={ this.handleForm }
            />
          </label>
          <label htmlFor="currencyID">
            Moeda
            <select
              id="currencyID"
              name="currency"
              value={ currency }
              data-testid="currency-input"
              onChange={ this.handleForm }
            >
              {this.handleSelectOptions()}
            </select>
          </label>
          <label htmlFor="methodID">
            Método de pagamento
            <select
              id="methodID"
              name="method"
              value={ method }
              onChange={ this.handleForm }
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
              name="categoria"
              value={ categoria }
              onChange={ this.handleForm }
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
        <button
          type="submit"
          form="form1"
          value="submit"
          onClick={ (e) => console.log(e.target) }
        >
          Adicionar despesa
        </button>
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
