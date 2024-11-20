import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskList from "@/components/tasks/TaskList";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetailsView() {
	const { data: user, isLoading: authLoading } = useAuth();
	const navigate = useNavigate();

	const params = useParams();
	const projectId = params.projectId!;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["project", projectId],
		queryFn: () => getProjectById(projectId), // siempre tiene que ser un callback por que si no se va a ejecutar al momento de renderizar el componente
		retry: 1,
	});

	if (isLoading && authLoading) return <p>Cargando...</p>;

	if (isError) return <Navigate to="/404" />;
	if (data && user)
		return (
			<>
				<h1 className="text-5xl font-black">{data.projectName}</h1>
				<p className="mt-5 text-2xl font-light text-gray-500">
					{data.projectDescription}
				</p>

				{isManager(data.manager, user._id) && (
					<nav className="flex gap-3 my-5">
						<button
							type="button"
							className="px-10 py-3 text-xl font-bold text-white transition-colors bg-purple-400 cursor-pointer hover:bg-purple-500"
							onClick={() => navigate(location.pathname + "?newTask=true")}>
							Agregar Tarea
						</button>

						<Link
							to={"team"}
							className="px-10 py-3 text-xl font-bold text-white transition-colors cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700">
							Colaboradores
						</Link>
					</nav>
				)}

				<TaskList tasks={data.tasks} />
				<AddTaskModal />
				<EditTaskData />
				<TaskModalDetails />
			</>
		);
}
