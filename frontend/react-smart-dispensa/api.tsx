import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5165",
  timeout: 5000,
});

// Login
export const login = async (usuario: string, senha: string) => {
  return api.post("/api/Login", { usuario, senha });
};

// Produtos
export const fetchProdutos = async () => {
  return api.get("/Lista");
};

