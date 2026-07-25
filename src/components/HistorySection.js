function HistorySection({ history, clearHistory }) {
    return (
        <div className="card mt-4">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4>
                        Recent Conversions
                    </h4>

                    <button className="btn btn-danger btn-sm" onClick={clearHistory}>Clear History</button>
                </div>
                <hr />

                {
                    history.length === 0 ?
                    (
                        <p>No conversion history.</p>
                    ):

                    (
                        history.map((item,index)=>(

                            <div key={index} className="border rounded p-2 mb-2">
                                <strong>
                                    {item.amount}
                                </strong>

                                {" "}
                                {item.from}→{item.to}<br/>
                                {item.result}
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}
export default HistorySection;