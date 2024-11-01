import {
	dashboardProjectSchema,
	Project,
	ProjectFormData,
} from "@/types/index";
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

/* Funcion para obtener un proyecto */
export async function getProjectById(id: Project["_id"]) {
	try {
		const { data } = await api(`/projects/${id}`);

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error); // lo evaluamos para que no se rompa el proyecto
		}
	}
}

/* Funcion para editar un proyecto */
type ProjectAPIType = {
	formData: ProjectFormData;
	projectId: Project["_id"];
}; // generamos un type para que nos aseguremos que el proyecto tenga los datos correctos

export async function updateProject({
	formData,
	projectId,
}: Pick<ProjectAPIType, "formData" | "projectId">) {
	try {
		const { data } = await api.put<string>(`/projects/${projectId}`, formData);

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error); // lo evaluamos para que no se rompa el proyecto
		}
	}
}

/* Funcion para eliminar un proyecto */
export async function deleteProject(id: Project["_id"]) {
	try {
		const { data } = await api.delete<string>(`/projects/${id}`);

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error); // lo evaluamos para que no se rompa el proyecto
		}
	}
}
