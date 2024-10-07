import { Fragment } from "react";
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogTitle,
	DialogPanel,
} from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddTaskModal() {
	const navigate = useNavigate();
	const location = useLocation(); // permite leer datos de la url, por ejemplo si esta la url /projects/123?newTask=true

	const queryParams = new URLSearchParams(location.search); // en una cadena de texto va a buscar los parametros que contienen un query string
	const modalTask = queryParams.get("newTask");
	const showModal = modalTask ? true : false;
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
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
