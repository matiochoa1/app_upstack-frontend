import { Task } from "@/types/index";
import TaskCard from "./TaskCard";

type TaskListProps = {
	tasks: Task[];
};

type GroupedTasks = {
	[key: string]: Task[];
}; // creamos este type para evitar que initialStatusGroups sea undefined cuando se renderiza el componente

const initialStatusGroups: GroupedTasks = {
	PENDING: [],
	ON_HOLD: [],
	IN_PROGRESS: [],
	UNDER_REVIEW: [],
	COMPLETED: [],
}; // inicializamos el estado de los grupos de tareas para que task.status sea uno de los valores de la enumeracion

const statusTranslations: { [key: string]: string } = {
	PENDING: "Pending",
	ON_HOLD: "On Hold",
	IN_PROGRESS: "In Progress",
	UNDER_REVIEW: "Under Review",
	COMPLETED: "Completed",
};

const statusColors: { [key: string]: string } = {
	PENDING: "border-t-yellow-500",
	ON_HOLD: "border-t-red-500",
	IN_PROGRESS: "border-t-blue-500",
	UNDER_REVIEW: "border-t-purple-500",
	COMPLETED: "border-t-green-500",
};

export default function TaskList({ tasks }: TaskListProps) {
	const groupedTasks = tasks.reduce((acc, task) => {
		let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
		currentGroup = [...currentGroup, task];
		return { ...acc, [task.status]: currentGroup };
	}, initialStatusGroups); // pasamos el valor inicial del estado para que task.status sea uno de los valores de la enumeracion

	return (
		<>
			<h2 className="my-10 text-5xl font-black">Tareas</h2>

			<div className="flex gap-5 pb-32 overflow-x-scroll 2xl:overflow-auto">
				{Object.entries(groupedTasks).map(([status, tasks]) => (
					<div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
						<h3
							className={`capitalize text-xl font-semibold border border-slate-300 bg-white p-3 border-t-8 ${statusColors[status]}`}>
							{statusTranslations[status]}
						</h3>

						<ul className="mt-5 space-y-5">
							{tasks.length === 0 ? (
								<li className="pt-3 text-center text-gray-500">
									No Hay tareas
								</li>
							) : (
								tasks.map((task) => <TaskCard key={task._id} task={task} />)
							)}
						</ul>
					</div>
				))}
			</div>
		</>
	);
}
