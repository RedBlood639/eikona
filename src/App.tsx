import { useState } from "react";
import { getNFTCollections } from "./utils/index";
import _ from "lodash";
import "./App.css";

function App() {
  const [address, setAddress] = useState<string>("");
  // @type  0 - start, 1 - running, 2- end
  const [status, setStatus] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);

  const onHandle = async () => {
    setStatus(true);

    let pack: any = [];
    if (address !== "") {
      pack = await getNFTCollections(address);
    } else {
      alert("Please input correct address.");
    }
    setStatus(false);
    setData(pack);
    console.log(pack);
  };

  return (
    <div className="App">
      <div>
        <input
          type={"text"}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={onHandle}>{"GET"}</button>
      </div>
      <div>
        {status ? "Searching" : _.isEmpty(data) ? "Nothing Found" : "Success"}
      </div>
    </div>
  );
}

export default App;
