import { useState, useEffect } from "react";
import "./App.css";

const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

interface IData {
  results: { name: string }[];
}

async function request() {
  const response = await fetch(url, {
    method: "GET",
  });
  const data: IData = await response.json();

  return data;
}

function App() {
  const [data, setData] = useState<IData>();

  useEffect(() => {
    request().then((result) => {
      setData(result);
    });
  }, []);

  console.log("data:", data);

  return (
    <ul>
      {data?.results?.map((e, i) => (
        <li key={i}>{e.name}</li>
      ))}
    </ul>
  );
}

export default App;
