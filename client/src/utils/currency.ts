/**
 * Format currency values in British Pounds (£)
 */
export const formatCurrency = (amount: number, includeDecimals: boolean = false): string => {
  if (includeDecimals) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format budget ranges for display
 */
export const formatBudgetRange = (min: number, max: number): string => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

/**
 * Format currency with compact notation for large amounts
 */
export const formatCurrencyCompact = (amount: number): string => {
  if (amount >= 1000000) {
    return `£${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `£${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount);
};

export default formatCurrency;