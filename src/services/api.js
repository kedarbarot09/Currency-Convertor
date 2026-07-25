const BASE_URL = "https://api.frankfurter.dev/v1";
// Fetch all available currencies
export const getCurrencies = async () => {
    const response = await fetch(
        `${BASE_URL}/currencies`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch currencies.");
    }
    return await response.json();
};

// Convert currency
export const convertCurrency = async (amount, from, to) => {
    const response = await fetch(
        `${BASE_URL}/latest?amount=${amount}&base=${from}&symbols=${to}`
    );

    if (!response.ok) {
        throw new Error("Failed to convert currency.");
    }
    return await response.json();
};

// Fetch last 7 days exchange rates
export const getExchangeHistory = async (from, to) => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);
    const startDate = lastWeek.toISOString().split("T")[0];
    const endDate = today.toISOString().split("T")[0];
    const response = await fetch(
        `${BASE_URL}/${startDate}..${endDate}?base=${from}&symbols=${to}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch history.");
    }
    return await response.json();
};