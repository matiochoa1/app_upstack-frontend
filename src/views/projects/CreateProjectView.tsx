import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectView() {
	const initialValues: ProjectFormData = {
		projectName: "",
		clientName: "",
		projectDescription: "",
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const handleForm = (data: ProjectFormData) => {
		createProject(data);
	};

	return (
		<>
			<div className="max-w-3xl mx-auto">
				<h1 className="text-5xl font-black">Crear Proyectos</h1>

				<p className="mt-5 text-2xl font-light text-gray-500">
					Llena el siguiente formulario para crear un nuevo proyecto
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
						value="Crear Proyecto"
						className="w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
					/>
				</form>
			</div>
		</>
	);
}
