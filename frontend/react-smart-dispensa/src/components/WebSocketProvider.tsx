import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type WebSocketData = {
  label: string;
  productCount: number;
  detectionHistory: { label: string; date: string; time: string }[];
  uniqueProducts: string[];
};

const WebSocketContext = createContext<WebSocketData | null>(null);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<WebSocketData | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081"); // Apontando para a porta correta: 8081



    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
    };

    return () => ws.close();
  }, []);

  return <WebSocketContext.Provider value={data}>{children}</WebSocketContext.Provider>;
};

export const useWebSocketData = () => useContext(WebSocketContext);
