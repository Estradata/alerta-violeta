import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  type PublicUser,
  publicUserSchema,
} from "../../../packages/validation/user-schema";

function App() {
  const [count, setCount] = useState(0);
  const data: PublicUser = {
    id: "12",
    name: "Daniel Martinez",
    email: "hello@gmail.com",
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <p className="text-start">
        Is Valid?: <pre>{JSON.stringify(data, null, 4)}</pre>
      </p>

      <p>{publicUserSchema.safeParse(data).success ? "Sí" : "No"}</p>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
