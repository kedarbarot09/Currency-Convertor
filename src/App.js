import { useState, useEffect, useCallback } from "react";

import "./App.css";

import ConverterForm from "./components/ConverterForm";
import ResultCard from "./components/ResultCard";
import ExchangeChart from "./components/ExchangeChart";
import HistorySection from "./components/HistorySection";

import {
    getCurrencies,
    convertCurrency,
    getExchangeHistory
} from "./services/api";

function App() {
    const [amount, setAmount] = useState(100);
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState("");
    const [exchangeRate, setExchangeRate] = useState("");
    const [historyData, setHistoryData] = useState([]);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const savedHistory = localStorage.getItem("conversionHistory");
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        async function loadCurrencies() {
            try {
                const data = await getCurrencies();
                setCurrencies(Object.entries(data));
            }
            catch {
                setError("Unable to load currencies.");
            }
        }
        loadCurrencies();
    }, []);

    // Convert currency
    const handleConvert = useCallback(async () => {
        setError("");
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount.");
            return;
        }
        try {
            const data = await convertCurrency(
                amount,
                fromCurrency,
                toCurrency
            );

            const converted = data.rates[toCurrency];
            const rate = converted / amount;
            const formattedResult = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: toCurrency
            }).format(converted);
            setConvertedAmount(formattedResult);
            setExchangeRate(
                `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`
            );

            // Save only the latest 5 conversions
                
            const newHistory = [
                {
                    amount,
                    from: fromCurrency,
                    to: toCurrency,
                    result: formattedResult
                },
                ...history

            ].slice(0, 5);
            setHistory(newHistory);
            localStorage.setItem(
                "conversionHistory",
                JSON.stringify(newHistory)
            );
        }
        catch (error) {
            setError("Unable to convert currency.");
        }
    }, [amount, fromCurrency, toCurrency, history]);

    // Automatically convert when values change
    useEffect(() => {
    if (currencies.length > 0) {
        handleConvert();
    }
    }, [currencies.length, handleConvert]);

    // Fetch exchange rate history for the chart
    useEffect(() => {async function loadHistory() {
            try {
                const data = await getExchangeHistory(fromCurrency, toCurrency
                );

                const chartHistory = Object.entries(data.rates).map(
                    ([date, value]) => ({
                        date,
                        rate: value[toCurrency]
                    })
                );
                setHistoryData(chartHistory);
            }
            catch {
                console.log("Unable to load chart.");
            }
        }

        if (currencies.length > 0) {
            loadHistory();
        }
    }, [fromCurrency, toCurrency, currencies.length]);
    
    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">
                Currency Converter Calculator
            </h1>

            <ConverterForm
                amount={amount}
                setAmount={setAmount}
                currencies={currencies}
                fromCurrency={fromCurrency}
                setFromCurrency={setFromCurrency}
                toCurrency={toCurrency}
                setToCurrency={setToCurrency}
                convertCurrency={handleConvert}
            />

            {
                error &&
                <div className="alert alert-danger mt-3">
                    {error}
                </div>
            }

            <ResultCard convertedAmount={convertedAmount} exchangeRate={exchangeRate}/>
            <ExchangeChart historyData={historyData}/>
            <HistorySection
                history={history}
                clearHistory={() => {
                    setHistory([]);
                    localStorage.removeItem("conversionHistory");
                }}
            />
        </div>
);}
export default App;