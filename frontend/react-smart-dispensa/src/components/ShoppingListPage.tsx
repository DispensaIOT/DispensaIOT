import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5165",
  timeout: 5000,
});

const ShoppingListPage = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/Lista");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const adicionarAoCarrinho = (produto: any) => {
    setCarrinho((prevCarrinho) => {
      const produtoExistente = prevCarrinho.find(
        (item) => item.id === produto.id
      );

      if (produtoExistente) {
        return prevCarrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  };

  const removerDoCarrinho = (produtoId: string) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.filter((item) => item.id !== produtoId)
    );
  };

  const voltarAoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-gradient-to-r from-PowderBlue to-SteelBlue min-h-screen text-white">
      <nav className="flex items-center justify-between px-8 py-4 bg-Zaza shadow-lg">
        <div className="text-2xl font-bold">Lista de Produtos</div>
        <button
          onClick={voltarAoDashboard}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Voltar ao Dashboard
        </button>
      </nav>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Lista de Produtos</h1>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="bg-Zaza p-4 rounded shadow-lg flex flex-col items-center"
              >
                <h2 className="text-xl font-bold mb-2">{produto.produto}</h2>
                <p className="mb-4">Quantidade disponível: {produto.quantidade}</p>
                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
          {carrinho.length === 0 ? (
            <p className="text-lg">Seu carrinho está vazio.</p>
          ) : (
            <div className="bg-Zaza p-4 rounded shadow-lg">
              <table className="table-auto w-full text-white">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Produto</th>
                    <th className="border px-4 py-2">Quantidade</th>
                    <th className="border px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {carrinho.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-2">{item.produto}</td>
                      <td className="border px-4 py-2">{item.quantidade}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => removerDoCarrinho(item.id)}
                          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
