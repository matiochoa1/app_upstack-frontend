import { dashboardProjectSchema, ProjectFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

/* Funcion para crear un proyecto */
export async function createProject(formData: ProjectFormData) {
	try {
		const { data } = await api.post("/projects", formData);

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error); // lo evaluamos para que no se rompa el proyecto
		}
	}
}

/* Funcion para obtener todos los proyectos */
export async function getProjects() {
	try {
		const { data } = await api("/projects");
		const response = dashboardProjectSchema.safeParse(data);

		if (response.success) {
			return response.data;
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error); // lo evaluamos para que no se rompa el proyecto
		}
	}
}
