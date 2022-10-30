import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Tables() {
    console.log("IN TABLES");
    const [data, setData] = useState([{}]);
    let tables;
    console.log("2", data);

    const navigate = useNavigate()
    const metrics = (tableName) => {
      navigate("/table/metrics?tableName=" + tableName);
    }

    useEffect(() => {
        console.log("3");
        fetch("/tables")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
                data.map(tableName => console.log("NAME: ", typeof tableName))
            });
    }, [1]);
    return (
        <div>
          {(data[0] && typeof data[0] !== "string") ? (
            <p>Loading...</p>
          ): (
            (data.map(tableName => <p onClick={() => metrics(tableName)}>{tableName}</p> ))
          )}
        </div>
    );
}
