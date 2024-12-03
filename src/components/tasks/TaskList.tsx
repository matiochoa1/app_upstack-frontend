import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Project, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateStatus } from "@/api/TaskAPI";
import { useParams } from "react-router-dom";

type TaskListProps = {
	tasks: TaskProject[];
	canEdit: boolean;
};

type GroupedTasks = {
	[key: string]: TaskProject[];
}; // creamos este type para evitar que initialStatusGroups sea undefined cuando se renderiza el componente

const initialStatusGroups: GroupedTasks = {
	PENDING: [],
	ON_HOLD: [],
	IN_PROGRESS: [],
	UNDER_REVIEW: [],
	COMPLETED: [],
}; // inicializamos el estado de los grupos de tareas para que task.status sea uno de los valores de la enumeracion

const statusColors: { [key: string]: string } = {
	PENDING: "border-t-yellow-500",
	ON_HOLD: "border-t-red-500",
	IN_PROGRESS: "border-t-blue-500",
	UNDER_REVIEW: "border-t-purple-500",
	COMPLETED: "border-t-green-500",
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
	const params = useParams();
	const projectId = params.projectId!;

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: updateStatus,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ["project", projectId] }); // Invalida la consulta para actualizar el proyecto
		},
	});

	const groupedTasks = tasks.reduce((acc, task) => {
		let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
		currentGroup = [...currentGroup, task];
		return { ...acc, [task.status]: currentGroup };
	}, initialStatusGroups); // pasamos el valor inicial del estado para que task.status sea uno de los valores de la enumeracion

	const handleDragEnd = (e: DragEndEvent) => {
		// Implementar funcionalidad para actualizar la base de datos al terminar un drag and drop
		console.log(e);
		const { over, active } = e;

		if (over && over.id) {
			const taskId = active.id.toString();
			const status = over.id as TaskStatus;

			mutate({ projectId, taskId, status });

			queryClient.setQueryData(["project", projectId], (prevData: Project) => {
				const updatedTasks = prevData.tasks.map((task) => {
					if (task._id === taskId) {
						return {
							...task,
							status,
						};
					}
					return task;
				});

				return { ...prevData, tasks: updatedTasks };
			}); // setQueryData() es una funcion sincrona que sirve para actualizar inmediateamente la cache de la consulta, entonces la UI se actualizará inmediatamente sin necesidad de refrescar la página.
		}
	};

	return (
		<>
			<h2 className="my-10 text-5xl font-black">Tareas</h2>

			<div className="flex gap-5 pb-32 overflow-x-scroll 2xl:overflow-auto">
				<DndContext onDragEnd={handleDragEnd}>
					{Object.entries(groupedTasks).map(([status, tasks]) => (
						<div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
							<h3
								className={`capitalize text-xl font-semibold border border-slate-300 bg-white p-3 border-t-8 ${statusColors[status]}`}>
								{statusTranslations[status]}
							</h3>

							<DropTask status={status} />

							<ul className="mt-5 space-y-5">
								{tasks.length === 0 ? (
									<li className="pt-3 text-center text-gray-500">
										No Hay tareas
									</li>
								) : (
									tasks.map((task) => (
										<TaskCard key={task._id} task={task} canEdit={canEdit} />
									))
								)}
							</ul>
						</div>
					))}
				</DndContext>
			</div>
		</>
	);
}
