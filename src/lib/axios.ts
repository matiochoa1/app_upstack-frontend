import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
}); // creamos una instancia de axios con la url base de la api para no tener que escribirla en cada petición

api.interceptors.request.use((config) => {
	const token = localStorage.getItem("AUTH_TOKEN");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
}); // interceptamos el token antes de cada request y si existe entonces enviamos la autorizacion con headers de autorizacion

export default api;
