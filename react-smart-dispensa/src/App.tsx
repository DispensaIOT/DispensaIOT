import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./components/WebSocketProvider";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login"; // Importando o componente de Login

const App: React.FC = () => (
  <Router>
    <WebSocketProvider>
      <Routes>
        {/* Define a rota para o login */}
        <Route path="/login" element={<Login />} />
        {/* Define a rota para o dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </WebSocketProvider>
  </Router>
);

export default App;
