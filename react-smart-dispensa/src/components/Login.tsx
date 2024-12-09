import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importando useNavigate

export const Login: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // Usando useNavigate para redirecionamento

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post("http://localhost:5009/api/Login", {
        usuario: usuario,
        senha: senha,
      });

      // Corrigindo a verificação para status 200
      if (response.status === 200) {
        alert("Login bem-sucedido!");
        navigate("/dashboard"); // Redireciona para o dashboard
      }
    } catch (error) {
      setErro("Usuário ou senha incorretos!");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-white">
      <div className="w-9/12 bg-white rounded-lg shadow-md flex">
        {/* Parte da esquerda - Bem-vindo */}
        <div className="w-3/5 flex flex-col justify-center items-center p-8 bg-white rounded-l-lg">
          <h2 className="text-3xl font-bold text-gray-800">Bem-vindo</h2>
          <p className="text-lg text-gray-600 mt-2">Estamos felizes em ter você aqui!</p>
        </div>

        {/* Parte da direita - Login */}
        <div className="w-3/5 flex flex-col justify-center items-center p-8 bg-Zaza rounded-lg">
          <img src="/salad.png" alt="Logo" className="mb-6 w-24 h-24" />
          <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <label htmlFor="usuario" className="block text-sm font-medium text-white">
                Usuário
              </label>
              <input
                type="text"
                id="usuario"
                className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-400 focus:border-blue-400"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="senha" className="block text-sm font-medium text-white">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="block w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-400 focus:border-blue-400"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            {erro && <p className="text-red-500 text-sm">{erro}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>

  );
};
