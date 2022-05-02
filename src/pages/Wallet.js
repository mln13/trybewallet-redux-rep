import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requestAPI from '../Api/Api';
import { walletRemoveAction, walletActionFetch, walletExpenseAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      value: '',
      description: '',
    };
    this.totalExpenses = this.totalExpenses.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
    this.handleSelectOptions = this.handleSelectOptions.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.submitClick = this.submitClick.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
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

  totalExpenses() {
    const { propsExpenses } = this.props;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    const total = propsExpenses.reduce((acumulador, elemento) => (
      acumulador + (elemento.value * elemento.exchangeRates[elemento.currency].ask)
    ), 0);
    return total.toFixed(2);
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

  async submitClick() {
    const apiCambio = await this.fetchAPI();
    const { storeExpenses } = this.props;
    storeExpenses(this.state, apiCambio);
    this.setState({
      value: '',
    });
  }

  handleRemoveClick(element) {
    const { removeStoreExpenses } = this.props;
    removeStoreExpenses(element);
  }

  render() {
    const { propsEmail, propsExpenses } = this.props;
    const { value, currency, tag, description, method } = this.state;
    return (
      <div>
        <header>
          <span
            data-testid="email-field"
          >
            Email:
            {propsEmail.email}
          </span>
          <span
            data-testid="total-field"
          >
            {this.totalExpenses()}
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
              type="text"
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
              name="tag"
              value={ tag }
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
          onClick={ (event) => this.submitClick(event) }
        >
          Adicionar despesa
        </button>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {propsExpenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{(element.exchangeRates[element.currency]).name}</td>
                <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (Number(element.exchangeRates[element.currency].ask) * element.value)
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.handleRemoveClick(element) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  propsEmail: PropTypes.objectOf.isRequired,
  storeCurrencies: PropTypes.func.isRequired,
  propsCurrency: PropTypes.arrayOf.isRequired,
  propsExpenses: PropTypes.func.isRequired,
  storeExpenses: PropTypes.func.isRequired,
  removeStoreExpenses: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    propsEmail: state.user,
    propsCurrency: state.wallet.currencies,
    propsExpenses: state.wallet.expenses,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    storeCurrencies: (currencies) => dispatch(walletActionFetch(currencies)),
    storeExpenses: (state, apiCambio) => dispatch(walletExpenseAction(state, apiCambio)),
    removeStoreExpenses: (element) => dispatch(walletRemoveAction(element)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
