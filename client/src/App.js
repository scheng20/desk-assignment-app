import React, { Fragment } from "react";
import "./App.css";

//components
import ListDesks from "./components/ListDesks";

function App() {
  return (
    <Fragment>
      <div className="container">
      	<h1 className="text-center mt-5">Desk Assignment App</h1>
        <ListDesks />
      </div>
    </Fragment>
  );
}

export default App;