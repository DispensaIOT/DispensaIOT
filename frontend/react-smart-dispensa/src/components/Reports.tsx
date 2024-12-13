import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const api = axios.create({
  baseURL: "http://localhost:5165",
  timeout: 5000,
});

const Reports = () => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosEmFalta, setProdutosEmFalta] = useState<any[]>([]);
  const [filtroEmFalta, setFiltroEmFalta] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/api/Lista");
        setProdutos(response.data);

        // Filtra produtos com quantidade menor que 5
        const faltantes = response.data.filter((produto: any) => produto.quantidade < 5);
        setProdutosEmFalta(faltantes);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const formatDateTime = (dateTime: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}/;
    const match = dateTime.match(regex);

    if (match) {
      const [year, month, day] = match[0].split("-");
      return `${day}/${month}/${year}`;
    }

    return dateTime;
  };

  const produtosParaExibir = filtroEmFalta ? produtosEmFalta : produtos;

  // Função para exportar produtos para CSV
  const exportToCSV = () => {
    const header = ["ID", "Produto", "Quantidade", "Data"];
    const rows = produtos.map((produto) => [
      produto.id,
      produto.produto,
      produto.quantidade,
      formatDateTime(produto.dataHora),
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "produtos.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Função para exportar para PDF
  const exportToPDF = async () => {
    const element = document.getElementById("report-table");

    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const pageHeight = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("relatorio.pdf");
    }
  };

  return (
    <div className="bg-gradient-to-r from-PowderBlue to-SteelBlue min-h-screen text-white">
      <nav className="flex items-center justify-between px-8 py-4 bg-Zaza shadow-lg">
        <div className="text-2xl font-bold">Relatório</div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-Lala rounded hover:bg-Lalah"
          >
            Voltar
          </button>
        </div>
      </nav>

      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Relatório de Produtos</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setFiltroEmFalta(!filtroEmFalta)}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              {filtroEmFalta ? "Mostrar Todos" : "Mostrar Em Falta"}
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            >
              Exportar CSV
            </button>
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Exportar PDF
            </button>
          </div>
        </div>

        <div className="bg-Zaza p-4 rounded shadow-lg" id="report-table">
          <table className="table-auto w-full text-white">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Produto</th>
                <th className="border px-4 py-2">Quantidade</th>
                <th className="border px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {produtosParaExibir.map((produto) => (
                <tr key={produto.id} className={produto.quantidade < 3 ? "bg-slate-500" : ""}>
                  <td className="border px-4 py-2">{produto.id}</td>
                  <td className="border px-4 py-2">{produto.produto}</td>
                  <td
                    className={`border px-4 py-2 ${produto.quantidade <= 0 ? "text-red-500" : ""} ${
                      produto.quantidade < 3 && produto.quantidade > 0 ? "text-yellow-600" : ""
                    }`}
                  >
                    {produto.quantidade}
                  </td>
                  <td className="border px-4 py-2">{formatDateTime(produto.dataHora)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
