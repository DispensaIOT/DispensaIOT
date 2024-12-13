import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5165",
  timeout: 5000,
});

const HistoryPage = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/Lista");
        // Adiciona propriedade ultimaAcao para cada produto
        const produtosComAcao = response.data.map((produto: any) => ({
          ...produto,
          ultimaAcao: produto.quantidadeAlterada > 0 ? "Adicionado" : "Retirado",
        }));
        setProdutos(produtosComAcao);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  // Função para navegar ao Dashboard
  const voltarAoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-gradient-to-r from-PowderBlue to-SteelBlue min-h-screen text-white">
      <nav className="flex items-center justify-between px-8 py-4 bg-Zaza shadow-lg">
        <div className="text-2xl font-bold">Histórico de Produtos</div>
      </nav>

      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold mb-6">Histórico de Alterações de Produtos</h1>
          <button
            onClick={voltarAoDashboard}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </button>
        </div>

        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="bg-Zaza p-4 rounded shadow-lg">
            <table className="table-auto w-full text-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Produto</th>
                  <th className="border px-4 py-2">Quantidade</th>
                  <th className="border px-4 py-2">Última Ação</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.produto}>
                    <td className="border px-4 py-2">{produto.produto}</td>
                    <td className="border px-4 py-2">{produto.quantidade}</td>
                    <td className="border px-4 py-2">{produto.ultimaAcao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
