import { Suspense } from "react";
import "./App.css";
import { atom, useAtom } from "jotai";

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

const pokemonAtom = atom(async () => {
  return request();
});

const DataLoader = () => {
  const [pokemon] = useAtom(pokemonAtom);
  // debugger;

  return <ul>{JSON.stringify(pokemon.results)}</ul>;
};

function App() {
  return (
    <Suspense fallback="로딩중">
      <DataLoader />
    </Suspense>
  );
}

export default App;
