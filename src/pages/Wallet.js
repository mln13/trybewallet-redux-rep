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
  }

  componentDidMount() {
    const { storeCurrencies } = this.props;
    this.fetchAPI().then((data) => {
      const listOfCurrencies = Object.keys(data);
      const filteredListOfCurriences = listOfCurrencies.filter((key) => (key !== 'USDT'));
      storeCurrencies(filteredListOfCurriences);
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
        TrybeWallet
      </div>
    );
  }
}

Wallet.propTypes = {
  propsEmail: PropTypes.objectOf.isRequired,
  storeCurrencies: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    propsEmail: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    storeCurrencies: (currencies) => dispatch(walletActionFetch(currencies)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
