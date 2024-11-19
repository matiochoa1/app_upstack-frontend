import { Fragment } from "react";
import {
	Menu,
	Transition,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import AddMemberModal from "@/components/team/AddMemberModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProjectTeamView() {
	const navigate = useNavigate();

	const params = useParams();
	const projectId = params.projectId!;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["projectTeam", projectId],
		queryFn: () => getProjectTeam(projectId),
		retry: false,
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: removeUserFromProject,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
		},
	});

	if (isLoading) return <p>Cargando...</p>;

	if (isError) return <Navigate to={"/404"} />;

	if (data)
		return (
			<>
				<h1 className="text-5xl font-black">Administrar Equipo</h1>
				<p className="mt-5 text-2xl font-light text-gray-500">
					Administra el equipo de trabajo para tu proyecto
				</p>

				<nav className="flex gap-3 my-5">
					<button
						type="button"
						className="px-10 py-3 text-xl font-bold text-white transition-colors bg-purple-400 cursor-pointer hover:bg-purple-500"
						onClick={() => navigate(location.pathname + "?addMember=true")}>
						Agregar Colaborador
					</button>

					<Link
						to={`/projects/${projectId}`}
						className="px-10 py-3 text-xl font-bold text-white transition-colors cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700">
						Volver a Proyecto
					</Link>
				</nav>

				<h2 className="my-10 text-5xl font-black">Miembros actuales</h2>
				{data.length ? (
					<ul
						role="list"
						className="mt-10 bg-white border border-gray-100 divide-y divide-gray-100 shadow-lg">
						{data?.map((member) => (
							<li
								key={member._id}
								className="flex justify-between px-5 py-10 gap-x-6">
								<div className="flex min-w-0 gap-x-4">
									<div className="flex-auto min-w-0 space-y-2">
										<p className="text-2xl font-black text-gray-600">
											{member.name}
										</p>
										<p className="text-sm text-gray-400">{member.email}</p>
									</div>
								</div>
								<div className="flex items-center shrink-0 gap-x-6">
									<Menu as="div" className="relative flex-none">
										<MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
											<span className="sr-only">opciones</span>
											<EllipsisVerticalIcon
												className="h-9 w-9"
												aria-hidden="true"
											/>
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
														className="block px-3 py-1 text-sm leading-6 text-red-500"
														onClick={() =>
															mutate({ projectId, id: member._id })
														}>
														Eliminar del Proyecto
													</button>
												</MenuItem>
											</MenuItems>
										</Transition>
									</Menu>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="py-20 text-center">No hay miembros en este equipo</p>
				)}

				<AddMemberModal />
			</>
		);
}
