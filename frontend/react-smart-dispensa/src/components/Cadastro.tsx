import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Cadastro: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");

    try {
      await axios.post("http://localhost:5165/api/Login", { usuario, senha });
      setMensagem("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      setMensagem("Erro ao realizar cadastro!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-white">
      <div className="w-1/2 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Crie sua conta</h2>
        <form onSubmit={handleCadastro}>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
              Usuário
            </label>
            <input
              type="text"
              id="usuario"
              className="block w-full px-4 py-2 mt-1 border rounded-lg"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="block w-full px-4 py-2 mt-1 border rounded-lg"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {mensagem && <p className="text-green-500 text-sm">{mensagem}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};
