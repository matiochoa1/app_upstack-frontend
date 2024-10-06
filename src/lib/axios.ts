import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
}); // creamos una instancia de axios con la url base de la api para no tener que escribirla en cada petición

export default api;
