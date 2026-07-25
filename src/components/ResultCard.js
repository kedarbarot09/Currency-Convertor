function ResultCard({ convertedAmount, exchangeRate }) {
    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h4 className="card-title">
                    Conversion Result
                </h4>

                <h2 className="text-success">
                    {convertedAmount || "--"}
                </h2>

                <p>
                    {exchangeRate || "Exchange rate will appear here."}
                </p>
            </div>
        </div>
    );
}
export default ResultCard;