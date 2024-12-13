import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import  Reports   from "./components/Reports";
import ShoppingListPage from "./components/ShoppingListPage";
import { Cadastro } from "./components/Cadastro";
import { Settings } from "./components/Settings"; // Importa Configurações
import HistoryPage from "./components/HistoryPage";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Rota para Login */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rota para Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Rota para Dashboard */}
        <Route
          path="/historypage"
          element={<HistoryPage />}
        />

        {/* Rota para ShoppingListPage */}
        <Route
          path="/shoppinglistpage"
          element={<ShoppingListPage />}
        />

        
        <Route path="/reports" element={<Reports />}
        />

        {/* Rota para Configurações */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
