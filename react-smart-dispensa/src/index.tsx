import React from "react";
import ReactDOM from "react-dom/client";  // Importa 'react-dom/client' em vez de 'react-dom'
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!); // Usando createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
