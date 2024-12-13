import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login: React.FC<{ setIsLoggedIn: (value: boolean) => void }> = ({
  setIsLoggedIn,
}) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.get("http://localhost:5165/api/Login");

      if (response.data && Array.isArray(response.data)) {
        const usuarioEncontrado = response.data.find(
          (item: { usuario: string; senha: string }) =>
            item.usuario === usuario && item.senha === senha
        );

        if (usuarioEncontrado) {
          alert("Login bem-sucedido!");
          setIsLoggedIn(true);
          navigate("/dashboard");
        } else {
          setErro("Usuário ou senha incorretos!");
        }
      } else {
        setErro("Resposta da API inválida!");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor!");
    }
  };

  const redirecionarParaCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-white">
      <div className="w-9/12 bg-white rounded-lg shadow-md flex">
        <div className="w-3/5 flex flex-col justify-center items-center p-8 bg-white rounded-l-lg">
          <h2 className="text-3xl font-bold text-gray-800">Bem-vindo</h2>
          <p className="text-lg text-gray-600 mt-2">Estamos felizes em ter você aqui!</p>
        </div>
        <div className="w-3/5 flex flex-col justify-center items-center p-8 bg-zaza rounded-lg">
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
          <button
            onClick={redirecionarParaCadastro}
            className="w-full px-4 py-2 mt-4 text-blue-700 border-2 border-blue-700 rounded-lg hover:bg-blue-100"
          >
            Criar uma conta
          </button>
        </div>
      </div>
    </div>
  );
};
