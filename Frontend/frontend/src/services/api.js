import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

// Função para enviar os dados da pesquisa usando o seu axios
export const salvarPesquisa = async (dados) => {
  const response = await api.post('/respostas', dados);
  return response.data;
};