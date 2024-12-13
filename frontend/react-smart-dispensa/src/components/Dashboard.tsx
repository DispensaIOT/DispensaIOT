import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocketData } from "./WebSocketProvider";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";
import "../styles/Dashboard.css";

const api = axios.create({
  baseURL: "http://localhost:5165",
  timeout: 5000,
});

type DashboardProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const data = useWebSocketData();
  const navigate = useNavigate();
  const webcamRef = useRef<tmImage.Webcam | null>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [maxPredictions, setMaxPredictions] = useState<number>(0);
  const [highestConfidenceLabel, setHighestConfidenceLabel] = useState<string>("");
  const [highestConfidence, setHighestConfidence] = useState<number>(0);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const fetchProdutos = async () => {
    try {
      const response = await api.get("/api/Lista");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    const initWebcamAndModel = async () => {
      const modelURL = "public/model/model.json";
      const metadataURL = "public/model/metadata.json";

      try {
        console.log("Tentando acessar a câmera...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Permissão para acessar a câmera concedida.");

        if (!stream.getVideoTracks().length) {
          throw new Error("Nenhum fluxo de vídeo encontrado.");
        }

        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setMaxPredictions(loadedModel.getTotalClasses());

        const webcam = new tmImage.Webcam(224, 224, true);
        await webcam.setup();
        await webcam.play();

        webcamRef.current = webcam;

        const webcamContainer = document.getElementById("webcam-container");
        if (webcamContainer) {
          webcamContainer.innerHTML = "";
          webcamContainer.appendChild(webcam.canvas);
        }

        window.requestAnimationFrame(loop);
      } catch (error) {
        console.error("Erro ao configurar a câmera:", error);
        alert(
          "Não foi possível acessar a câmera. Verifique as permissões e tente novamente."
        );
      }
    };

    const loop = async () => {
      if (webcamRef.current && model) {
        webcamRef.current.update();
        await predict();
        window.requestAnimationFrame(loop);
      }
    };

    const predict = async () => {
      if (model && webcamRef.current) {
        const prediction = await model.predict(webcamRef.current.canvas);
        let highestLabel = "";
        let highestProb = 0;

        for (let i = 0; i < maxPredictions; i++) {
          const probability = parseFloat(prediction[i].probability.toFixed(2));
          if (probability > highestProb) {
            highestProb = probability;
            highestLabel = prediction[i].className;
          }
        }

        setHighestConfidence(highestProb);
        setHighestConfidenceLabel(highestLabel);
      }
    };

    initWebcamAndModel();

    return () => {
      webcamRef.current?.stop();
    };
  }, [maxPredictions]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = produtos.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDateTime = (dateTime: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}/;
    const match = dateTime.match(regex);

    if (match) {
      const [year, month, day] = match[0].split("-");
      return `${day}/${month}/${year}`;
    }

    return dateTime;
  };

  return (
    <div className="bg-gradient-to-r from-PowderBlue to-SteelBlue min-h-screen text-white">
      <nav className="flex items-center justify-between px-8 py-4 bg-Zaza shadow-lg">
        <div className="text-2xl font-bold">Dispensa Smart</div>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-Lala rounded hover:bg-Lalah"
            onClick={() => navigate("/historypage")}
          >
            Histórico
          </button>
          <button
            className="px-4 py-2 bg-Lala rounded hover:bg-Lalah"
            onClick={() => navigate("/shoppinglistpage")}
          >
            Lista
          </button>
          <button
            className="px-4 py-2 bg-Lala rounded hover:bg-Lalah"
            onClick={() => navigate("/reports")}
          >
            Relatório
          </button>
          <button
            className="px-4 py-2 bg-Lala rounded hover:bg-Lalah"
            onClick={() => navigate("/settings")}
          >
            Configurações
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        <div className="space-y-4">
          <div className="bg-Zaza p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">Identificação Atual</h2>
            <p className="text-lg">
              {highestConfidenceLabel} ({(highestConfidence * 100).toFixed(0)}%)
            </p>
          </div>
          <div
            id="webcam-container"
            className="bg-gray-900 p-4 rounded shadow-lg"
          ></div>
        </div>

        <div className="bg-Zaza p-4 rounded shadow-lg">
          <h2 className="text-xl font-bold">Tabela de Produtos</h2>
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
              {currentItems.map((produto) => (
                <tr key={produto.id}>
                  <td className="border px-4 py-2">{produto.id}</td>
                  <td className="border px-4 py-2">{produto.produto}</td>
                  <td className="border px-4 py-2">{produto.quantidade}</td>
                  <td className="border px-4 py-2">{formatDateTime(produto.dataHora)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            {Array.from(
              { length: Math.ceil(produtos.length / itemsPerPage) },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
