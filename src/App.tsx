import "./App.css";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useSearchParams,
} from "react-router-dom";

interface IData {
  results: { name: string }[];
}

async function request(pageNumber: number) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=5&offset=${pageNumber}`,
    {
      method: "GET",
    }
  );
  const data: IData = await response.json();

  return data;
}

const DataLoader = () => {
  const [params, setParams] = useSearchParams();
  const pageNumber = Number(params.get("pageNumber")) || 0;

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", pageNumber],
    queryFn: () => request(pageNumber),
  });

  if (isLoading) {
    return "로딩중";
  }

  return (
    <>
      <ul>
        {data?.results?.map((e, i) => (
          <li key={i}>{e.name}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => setParams({ pageNumber: `${pageNumber + 1}` })}
      >
        +
      </button>
      <span>{pageNumber}</span>
      <button
        type="button"
        onClick={() => setParams({ pageNumber: `${pageNumber - 1}` })}
      >
        -
      </button>
    </>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <QueryClientProvider client={new QueryClient()}>
            <DataLoader />
          </QueryClientProvider>
        }
      />
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
