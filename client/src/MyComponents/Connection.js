import React, { useEffect, useState, useRef } from "react";

export default function Connection() {
    const [data, setData] = useState([{}]);
    const formElement = useRef(null);
    const saveConnection = () => {
        console.log(formElement.current.elements);
        const connectionData = Array.from(formElement.current.elements)
            .filter((input) => input.name)
            .reduce(
                (obj, input) =>
                    Object.assign(obj, { [input.name]: input.value }),
                {}
            );
        console.log(connectionData);
        fetch("/create/connection", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(connectionData),
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                console.log(data);
            });
    };

    return (
        <div>
            <form ref={formElement} onSubmit={saveConnection} target="_blank">
                <div className="mb-3">
                    <label htmlFor="exampleInputName1" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        name="username"
                    />
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
            </form>
        </div>
    );
}
