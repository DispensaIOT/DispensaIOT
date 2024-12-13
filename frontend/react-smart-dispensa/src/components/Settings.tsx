import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("pt");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      }`}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800"
        >
          Voltar ao Dashboard
        </button>
      </nav>

      {/* Conteúdo */}
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Ajustes</h2>

        {/* Tema */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">Tema</h3>
          <button
            onClick={toggleTheme}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Alternar para tema {theme === "light" ? "escuro" : "claro"}
          </button>
        </div>

        {/* Idioma */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">Idioma</h3>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="mt-2 px-4 py-2 border rounded bg-white text-black"
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </div>
  );
};
