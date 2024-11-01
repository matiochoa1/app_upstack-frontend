import { Fragment } from "react";
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Task, TaskFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

type EditTaskModalProps = {
	data: Task;
	taskId: Task["_id"];
};

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {
	const navigate = useNavigate();

	// Obtener el id del proyecto
	const params = useParams();
	const projectId = params.projectId!;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TaskFormData>({
		defaultValues: {
			taskName: data.taskName,
			description: data.description,
		},
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: updateTask,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
			queryClient.invalidateQueries({ queryKey: ["task"] });
			toast.success(data);
			reset();
			navigate(location.pathname, { replace: true });
		},
	});

	const handleEditTask = (formData: TaskFormData) => {
		const data = {
			formData,
			projectId,
			taskId,
		};

		mutate(data);
	};

	return (
		<Transition appear show={true} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => navigate(location.pathname, { replace: true })}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black/60" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-full p-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<DialogPanel className="w-full max-w-4xl p-16 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<DialogTitle as="h3" className="my-5 text-4xl font-black">
									Editar Tarea
								</DialogTitle>

								<p className="text-xl font-bold">
									Realiza cambios a una tarea en {""}
									<span className="text-fuchsia-600">este formulario</span>
								</p>

								<form
									className="mt-10 space-y-3"
									noValidate
									onSubmit={handleSubmit(handleEditTask)}>
									<TaskForm register={register} errors={errors} />
									<input
										type="submit"
										className="w-full p-3 text-xl font-black text-white cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
										value="Guardar Tarea"
									/>
								</form>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
