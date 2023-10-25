import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { AlertsProvider } from "./context/alertsContextProvider";

function App() {
  return (
    <AlertsProvider
      initialValue={{
        open: false,
        severity: "error",
        message: "",
      }}
    >
      <div className="App">
        <Layout />
      </div>
    </AlertsProvider>
  );
}

export default App;
