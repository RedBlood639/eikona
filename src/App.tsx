import React, { useState } from "react";
import logo from "./logo.svg";
import { getNFTCollections } from "./utils/index";
import "./App.css";

function App() {
  const [address, setAddress] = useState<string>("");
  const onHandle = async () => {
    let data = [];
    if (address !== "") {
      data = await getNFTCollections(address);
    }

    console.log(data);
  };
  return (
    <div className="App">
      <input
        type={"text"}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={onHandle}>{"GET"}</button>
    </div>
  );
}

export default App;
