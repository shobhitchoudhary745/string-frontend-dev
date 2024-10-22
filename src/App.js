import { useEffect } from "react";
import "./App.scss";
import Layout from "./Layout";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      document.addEventListener("contextmenu", (e) => e.preventDefault());
      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === "I") {
          e.preventDefault();
        }
      });
    }
  }, []);
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
