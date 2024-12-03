import { Fragment } from "react";
import {
	Menu,
	MenuButton,
	Transition,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskProject } from "@/types/index";
import { toast } from "react-toastify";
import { deleteTask } from "@/api/TaskAPI";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
	task: TaskProject;
	canEdit: boolean;
};

export default function TaskCard({ task, canEdit }: TaskCardProps) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task._id,
	});

	const navigate = useNavigate();
	const params = useParams();
	const projectId = params.projectId!;
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: deleteTask,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["project", projectId] });
			toast.success(data);
		},
	});

	const handleDeleteTask = () => {
		mutate({ projectId, taskId: task._id });
	};

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				padding: "1.25rem",
				backgroundColor: "#fff",
				width: "300px",
				display: "flex",
				borderWidth: "1px",
				borderColor: "rgb(203,213,225 / var(--tw-border-opacity))",
		  }
		: undefined;

	return (
		<>
			<li className="flex justify-between gap-3 p-5 bg-white border-slate-300">
				<div
					{...listeners}
					{...attributes}
					ref={setNodeRef}
					style={style}
					className="flex flex-col min-w-0 gap-y-4">
					<button
						type="button"
						className="text-xl font-bold text-left text-slate-600 "
						onClick={() =>
							navigate(location.pathname + `?editTask=${task._id}`)
						}>
						{task.taskName}
					</button>
					<p className="text-slate-500">{task.description}</p>
				</div>

				<div className="flex shrink-0 gap-x-6">
					<Menu as="div" className="relative flex-none">
						<MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
							<span className="sr-only">opciones</span>
							<EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
						</MenuButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<MenuItems className="absolute right-0 z-10 w-56 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
								<MenuItem>
									<button
										type="button"
										className="block w-full px-3 py-1 text-sm leading-6 text-gray-900 transition-colors rounded-lg hover:bg-purple-500 text-start"
										onClick={() =>
											navigate(location.pathname + `?viewTask=${task._id}`)
										}>
										Ver Tarea
									</button>
								</MenuItem>
								{canEdit && (
									<>
										<MenuItem>
											<button
												type="button"
												className="block w-full px-3 py-1 text-sm leading-6 text-gray-900 transition-colors rounded-lg hover:bg-purple-500 text-start"
												onClick={() =>
													navigate(location.pathname + `?editTask=${task._id}`)
												}>
												Editar Tarea
											</button>
										</MenuItem>

										<MenuItem>
											<button
												type="button"
												className="block w-full px-3 py-1 text-sm leading-6 text-red-500 transition-colors rounded-lg hover:bg-red-500 hover:text-white text-start"
												onClick={handleDeleteTask}>
												Eliminar Tarea
											</button>
										</MenuItem>
									</>
								)}
							</MenuItems>
						</Transition>
					</Menu>
				</div>
			</li>
		</>
	);
}
