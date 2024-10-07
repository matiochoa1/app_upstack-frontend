import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "@/components/projects/ProjectForm";
import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
	data: ProjectFormData;
	projectId: Project["_id"];
};

export default function EditProjectForm({
	data,
	projectId,
}: EditProjectFormProps) {
	const navigate = useNavigate();

	const initialValues: ProjectFormData = {
		projectName: data.projectName,
		clientName: data.clientName,
		projectDescription: data.projectDescription,
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: updateProject,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["projects"] }); // invalidamos la query para que se actualice la lista de proyectos
			queryClient.invalidateQueries({ queryKey: ["editProject", projectId] }); // invalidamos la query para que se actualice el proyecto
			toast(data);
			navigate("/");
		},
	});

	const handleForm = (formData: ProjectFormData) => {
		const data = {
			formData,
			projectId,
		};

		mutate(data);
	};
	return (
		<>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-5xl font-black">Editar Proyecto</h1>

				<p className="mt-5 text-2xl font-light text-gray-500">
					Llena el siguiente formulario para editar un proyecto
				</p>

				<nav className="my-5">
					<Link
						className="px-10 py-3 text-xl font-bold text-white transition-colors bg-purple-400 cursor-pointer hover:bg-purple-500"
						to="/">
						Volver a Proyectos
					</Link>
				</nav>

				<form
					className="p-10 mt-10 bg-white rounded-lg shadow-lg"
					onSubmit={handleSubmit(handleForm)}
					noValidate>
					<ProjectForm register={register} errors={errors} />
					<input
						type="submit"
						value="Guardar Cambios"
						className="w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
					/>
				</form>
			</div>
		</>
	);
}
