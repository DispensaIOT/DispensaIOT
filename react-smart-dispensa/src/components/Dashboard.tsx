import React, { useEffect, useState, useRef } from "react";
import { useWebSocketData } from "./WebSocketProvider";
import * as tmImage from "@teachablemachine/image";
import "../styles/Dashboard.css";

export const Dashboard: React.FC = () => {
  const data = useWebSocketData();
  const webcamRef = useRef<tmImage.Webcam | null>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [maxPredictions, setMaxPredictions] = useState<number>(0);
  const [highestConfidenceLabel, setHighestConfidenceLabel] = useState<string>("");
  const [highestConfidence, setHighestConfidence] = useState<number>(0);
  
  const [produtos, setProdutos] = useState<any[]>([]); // Array para armazenar os produtos
  
  // Função para buscar os produtos da API
  const fetchProdutos = async () => {
    try {
      const response = await fetch("http://localhost:5009/api/Lista"); // Altere para o endpoint correto
      const produtosData = await response.json();
      setProdutos(produtosData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    // Carregar webcam e modelo
    const initWebcamAndModel = async () => {
      const modelURL = "/model/model.json";
      const metadataURL = "/model/metadata.json";

      try {
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
        console.error("Erro ao configurar a webcam:", error);
      }
    };

    initWebcamAndModel();

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

    return () => {
      webcamRef.current?.stop();
    };
  }, [maxPredictions]);

  useEffect(() => {
    fetchProdutos(); // Chama a função para buscar produtos
  }, []);

  return (
    <div className="bg-gradient-to-r from-PowderBlue to-SteelBlue min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-Zaza shadow-lg">
        <div className="text-2xl font-bold">Dispensa Smart</div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-Lala rounded hover:bg-Lalah">Produtos</button>
          <button className="px-4 py-2 bg-Lala rounded hover:bg-Lalah">Histórico</button>
          <button className="px-4 py-2 bg-Lala rounded hover:bg-Lalah">Lista</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        {/* Webcam and Predictions */}
        <div className="space-y-4">
          <div className="bg-Zaza p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">Identificação Atual</h2>
            <p className="text-lg">
              {highestConfidenceLabel} ({(highestConfidence * 100).toFixed(0)}%)
            </p>
          </div>
          <div id="webcam-container" className="bg-gray-900 p-4 rounded shadow-lg"></div>
        </div>

        {/* Produtos */}
        <div className="space-y-4">
          <div className="bg-Zaza p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">Produtos na Dispensa</h2>
            <ul className="space-y-2">
              {produtos.map((produto, index) => (
                <li key={index} className="text-lg">
                  {produto.produto} - {produto.quantidade} unidades
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
