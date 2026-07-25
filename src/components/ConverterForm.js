function ConverterForm({
    amount,
    setAmount,
    currencies,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertCurrency

}) {

    return (
        <div className="card shadow-lg p-3">
            <div className="card-body">
                <h3 className="mb-4">
                    Currency Converter
                </h3>

                <div className="row">
                    {/* Amount */}
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Amount</label>

                        <input type="number" className="form-control" value={amount} min="1" onChange={(e) => setAmount(e.target.value)}/>
                    </div>

                    {/* From Currency */}
                    <div className="col-md-4 mb-3">
                        <label className="form-label">From</label>

                        <select
                            className="form-select"
                            value={fromCurrency}
                            onChange={(e) =>
                                setFromCurrency(e.target.value)
                            }
                        >
                            {
                                currencies.map(([code,name])=>(
                                    <option key={code} value={code}>{code} - {name}</option>
                                ))
                            }
                        </select>
                    </div>

                    {/* To Currency */}
                    <div className="col-md-4 mb-3">
                        <label className="form-label">To</label>

                        <select
                            className="form-select"
                            value={toCurrency}
                            onChange={(e) =>
                                setToCurrency(e.target.value)
                            }
                        >
                            {
                                currencies.map(([code,name])=>(
                                    <option key={code} value={code}>{code} - {name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <button className="btn btn-success btn-lg w-100 mt-4" onClick={convertCurrency}>Convert Currency</button>
            </div>
        </div>
    );
}
export default ConverterForm;