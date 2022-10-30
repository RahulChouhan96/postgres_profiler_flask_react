import React, { useEffect, useState } from "react";

export default function Metrics() {
    const queryParams = new URLSearchParams(window.location.search);
    const tableName = queryParams.get("tableName");
    const [data, setData] = useState([{}]);
    const tableRows = [];

    useEffect(() => {
        fetch("/table/metrics?tableName=" + tableName)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, []);
    return (
        <div>
            {data[0] && typeof data[0] !== "string" ? (
                <td>Lodiang...</td>
            ) : (
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <b>Row Count</b> {data["row_size"]}
                            </div>
                            <div className="col-md-3">
                                <b>Column Count</b> {data["column_size"]}
                            </div>
                            <div className="col-md-3">
                                <b>Table Sample</b> 100%
                            </div>
                        </div>
                    </div>
                    <table className="table">
                        <tr>
                            <th>Name</th>
                            <th>Null %</th>
                            <th>Unique %</th>
                            <th>Value Count</th>
                        </tr>
                        {Object.keys(data["column_fields_metrics"]).map(columnName => (
                            <tr>
                                <td>{columnName}</td>
                                <td>{data["column_fields_metrics"][columnName]["null"]}</td>
                                <td>{data["column_fields_metrics"][columnName]["unique"]}</td>
                                <td>{data["column_fields_metrics"][columnName]["value_count"]}</td>
                            </tr>
                        ))}
                        
                    </table>
                </div>
            )}
        </div>
    );
}
