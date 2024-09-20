export const getInrType = (amount: string) => {
  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return rupee.format(Number(amount));
};

export const formatCurrency = (
  amount: string,
  currencyCode: string
): string => {
  if (amount == "" || currencyCode == "") {
    return "";
  }

  const validCurrencyCodes = [
    "USD",
    "EUR",
    "GBP",
    "AUD",
    "CAD",
    "SGD",
    "INR", // Add more as needed
  ];

  // Check if the currencyCode is valid
  if (!validCurrencyCodes.includes(currencyCode)) {
    console.error(`Invalid currency code: ${currencyCode}`);
    return amount;
  }

  // Create a NumberFormat object for the specific currency code
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  });

  // Format the amount using the formatter
  return formatter.format(Number(amount));
};
