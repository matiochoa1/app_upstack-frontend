import { Fragment } from "react";
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogTitle,
	DialogPanel,
} from "@headlessui/react";
import {
	Navigate,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTaskById, updateStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/utils";
import { statusTranslations } from "@/locales/es";
import { TaskStatus } from "@/types/index";

export default function TaskModalDetails() {
	const params = useParams();
	const projectId = params.projectId!;
	const navigate = useNavigate();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get("viewTask")!;

	const show = taskId ? true : false;

	const { data, isError, error } = useQuery({
		queryKey: ["task", taskId],
		queryFn: () => getTaskById({ projectId, taskId }),
		enabled: !!taskId,
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: updateStatus,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ["project", projectId] }); // Invalida la consulta para actualizar el proyecto
			queryClient.invalidateQueries({ queryKey: ["task", taskId] }); // Invalida la consulta para actualizar la tarea
		},
	});

	const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const status = e.target.value as TaskStatus;

		const data = {
			projectId,
			taskId,
			status,
		};

		mutate(data);
	};

	if (isError) {
		toast.error(error.message, { toastId: "error" }); // agregando el toastId para que no se repita el toast cuando se actualiza la pagina
		return <Navigate to={`/projects/${projectId}`} />; // buena practica para que react router dom no arroje un error de que no se encontro la pagina
	}
	if (data)
		return (
			<>
				<Transition appear show={show} as={Fragment}>
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
										<p className="text-sm text-slate-400">
											Agregada el: {formatDate(data.createdAt)}
										</p>
										<p className="text-sm text-slate-400">
											Última actualización: {formatDate(data.updatedAt)}
										</p>

										<DialogTitle
											as="h3"
											className="my-5 text-4xl font-black text-slate-600">
											{data.taskName}
										</DialogTitle>

										<p className="mb-2 text-lg text-slate-500">
											Descripción: {data.description}
										</p>

										<p className="mb-2 text-2xl text-slate-500">
											Historial de Cambios
										</p>
										<ul className="list-decimal">
											{data.completedBy.map((change) => (
												<li key={change._id}>
													<span className="font-bold text-slate-600">
														{statusTranslations[change.status]}
													</span>{" "}
													por: {change.user.name}
												</li>
											))}
										</ul>
										<div className="my-5 space-y-3">
											<label className="font-bold">Estado Actual:</label>

											<select
												className="w-full p-3 bg-white border border-gray-300"
												defaultValue={data.status}
												onChange={handleChangeStatus}>
												{Object.entries(statusTranslations).map(
													([key, value]) => (
														<option key={key} value={key}>
															{value}
														</option>
													)
												)}
											</select>
										</div>
									</DialogPanel>
								</TransitionChild>
							</div>
						</div>
					</Dialog>
				</Transition>
			</>
		);
}
