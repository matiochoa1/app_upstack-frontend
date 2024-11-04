import { Fragment } from "react";
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogTitle,
	DialogPanel,
} from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TaskForm from "./TaskForm";
import { TaskFormData } from "@/types/index";
import { createTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

export default function AddTaskModal() {
	const navigate = useNavigate();

	/* Read if modal exists */
	const location = useLocation(); // permite leer datos de la url, por ejemplo si esta la url /projects/123?newTask=true
	const queryParams = new URLSearchParams(location.search); // en una cadena de texto va a buscar los parametros que contienen un query string
	const modalTask = queryParams.get("newTask");
	const showModal = modalTask ? true : false;

	/* Obtain projectId from url */
	const params = useParams();
	const projectId = params.projectId!;

	const initialValues: TaskFormData = {
		taskName: "",
		description: "",
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ defaultValues: initialValues });

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: createTask,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["project", projectId] });
			toast.success(data);
			reset();
			navigate(location.pathname, { replace: true });
		},
	});

	const handleCreateTask = (formData: TaskFormData) => {
		const data = {
			formData,
			projectId,
		};

		mutate(data);
	};
	return (
		<>
			<Transition appear show={showModal} as={Fragment}>
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
										Nueva Tarea
									</DialogTitle>

									<p className="text-xl font-bold">
										Llena el formulario y crea {""}
										<span className="text-fuchsia-600">una tarea</span>
									</p>

									<form
										className="mt-10 space-y-3"
										noValidate
										onSubmit={handleSubmit(handleCreateTask)}>
										<TaskForm errors={errors} register={register} />
										<input
											type="submit"
											value="Guardar Tarea"
											className="w-full p-3 font-bold text-white uppercase transition-colors cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
										/>
									</form>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
