const axios = require('axios');

/**
 * Service to interact with the external ExchangeRate API.
 * Using open.er-api.com as it doesn't require an API key for the free tier.
 */
class ExchangeService {
  constructor() {
    this.baseURL = process.env.EXCHANGE_API_URL || 'https://open.er-api.com/v6/latest';
  }

  /**
   * Fetch the latest exchange rates for a given base currency.
   * @param {string} base Base currency code (default: USD)
   */
  async getRates(base = 'USD') {
    try {
      const response = await axios.get(`${this.baseURL}/${base}`);
      if (response.data && response.data.result === 'success') {
        return response.data.rates;
      } else {
        throw new Error('Failed to fetch exchange rates.');
      }
    } catch (error) {
      console.error('Exchange API Error:', error.message);
      throw new Error('Could not retrieve exchange rates from external API.');
    }
  }

  /**
   * Fetch all supported currency codes.
   */
  async getCurrencies() {
    try {
      // By fetching rates for USD, we get the keys (currency codes)
      const rates = await this.getRates('USD');
      return Object.keys(rates);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ExchangeService();
