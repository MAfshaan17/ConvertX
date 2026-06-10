export const getCurrencyName = (code) => {
  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'currency' });
    return displayNames.of(code);
  } catch (e) {
    return code;
  }
};

export const getCurrencySymbol = (code) => {
  try {
    const parts = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: code,
    }).formatToParts(0);
    const currencyPart = parts.find(part => part.type === 'currency');
    return currencyPart ? currencyPart.value : code;
  } catch (e) {
    return code;
  }
};

export const getCurrencyLabel = (code) => {
  const name = getCurrencyName(code);
  const symbol = getCurrencySymbol(code);
  
  // If the API somehow doesn't know the name, just return the code
  if (name === code) return code;
  
  // Format: "USD - US Dollar ($)"
  return `${code} - ${name} (${symbol})`;
};

export const getCountryFromCurrency = (currencyCode) => {
  if (currencyCode === 'EUR') return 'European Union';
  if (currencyCode === 'BTC') return 'Bitcoin Network';
  if (currencyCode === 'XAF' || currencyCode === 'XOF') return 'Central/West Africa';
  if (currencyCode === 'XCD') return 'East Caribbean';
  
  try {
    const countryCode = currencyCode.substring(0, 2);
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(countryCode);
  } catch (e) {
    return 'Global / Unknown';
  }
};

export const getFlagUrl = (currencyCode) => {
  if (currencyCode === 'EUR') return 'https://flagcdn.com/w80/eu.png';
  if (currencyCode === 'BTC') return 'https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg';
  if (currencyCode.startsWith('X')) return 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Globe.svg'; // Global/Special currencies
  
  try {
    const countryCode = currencyCode.substring(0, 2).toLowerCase();
    return `https://flagcdn.com/w80/${countryCode}.png`;
  } catch (e) {
    return 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Globe.svg';
  }
};
