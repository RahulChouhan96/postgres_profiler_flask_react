import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Connection from "./MyComponents/Connection";
import Metrics from "./MyComponents/Metrics";
import Tables from "./MyComponents/Tables";

function App() {
    // const [data, setData] = useState([{}]);

    // useEffect(() => {
    //     fetch("/tables")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setData(data);
    //             console.log(data);
    //         });
    // }, []);
    // return (
    //     <div>
    //         <form>
    //             <div className="mb-3">
    //                 <label for="exampleInputName1" className="form-label">Username</label>
    //                 <input type="text" className="form-control" id="exampleInputName1"/>
    //             </div>
    //             <div className="mb-3">
    //                 <label for="exampleInputPassword1" className="form-label">Password</label>
    //                 <input type="password" className="form-control" id="exampleInputPassword1"/>
    //             </div>
    //             <button type="submit" className="btn btn-primary">Save</button>
    //         </form>
    //     </div>
    // );

    // return (
    //     <>
    //         <Metrics />
    //     </>
    // )

    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/connection" element={<Connection />} />
                    <Route exact path="/tables" element={<Tables />} />
                    <Route exact path="/table/metrics" element={<Metrics />} />
                </Routes>
            </Router>
        </>
    )
}

export default App;
