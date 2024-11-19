import { Fragment } from "react";
import {
	Dialog,
	Transition,
	TransitionChild,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import AddMemberForm from "./AddMemberForm";

export default function AddMemberModal() {
	const location = useLocation();
	const navigate = useNavigate();

	const queryParams = new URLSearchParams(location.search);
	const addMember = queryParams.get("addMember");
	const show = addMember ? true : false;

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
									<DialogTitle as="h3" className="my-5 text-4xl font-black">
										Agregar Integrante al equipo
									</DialogTitle>
									<p className="text-xl font-bold">
										Busca el nuevo integrante por email {""}
										<span className="text-fuchsia-600">
											para agregarlo al proyecto
										</span>
									</p>

									<AddMemberForm />
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
