import { Fragment } from "react";
import {
	Menu,
	Transition,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject, getProjects } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardView() {
	const { data: user, isLoading: authLoading } = useAuth();

	const { data, isLoading } = useQuery({
		queryKey: ["projects"], // permite que react-query sepa que hacer con los datos y cachearlos para que no se vuelvan a pedir
		queryFn: getProjects,
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: deleteProject,
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	if (isLoading && authLoading) return <p>Cargando...</p>;

	if (data && user)
		return (
			<>
				<h1 className="text-5xl font-black">Mis Proyectos</h1>

				<p className="mt-5 text-2xl font-light text-gray-500">
					Maneja y Administra tus proyectos
				</p>

				<nav className="my-5">
					<Link
						className="px-10 py-3 text-xl font-bold text-white transition-colors bg-purple-400 cursor-pointer hover:bg-purple-500"
						to="/projects/create">
						Nuevo Proyecto
					</Link>
				</nav>

				{data.length ? (
					<ul
						role="list"
						className="mt-10 bg-white border border-gray-100 divide-y divide-gray-100 shadow-lg">
						{data.map((project) => (
							<li
								key={project._id}
								className="flex justify-between px-5 py-10 gap-x-6">
								<div className="flex min-w-0 gap-x-4">
									<div className="flex-auto min-w-0 space-y-2">
										<Link
											to={`/projects/${project._id}`}
											className="text-3xl font-bold text-gray-600 cursor-pointer hover:underline">
											{project.projectName}
										</Link>
										<div>
											{project.manager === user._id ? (
												<p className="inline-block px-5 py-1 mt-2 text-xs font-bold text-blue-500 uppercase border-2 border-blue-500 rounded-lg bg-indigo-50 ">
													Manager
												</p>
											) : (
												<p className="inline-block px-5 py-1 mt-2 text-xs font-bold uppercase border-2 rounded-lg text-sky-300 border-sky-300 bg-indigo-50">
													Colaborador
												</p>
											)}
										</div>
										<p className="text-sm text-gray-400">
											Cliente: {project.clientName}
										</p>
										<p className="text-sm text-gray-400">
											{project.projectDescription}
										</p>
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
													<Link
														to={`/projects/${project._id}`}
														className="block px-3 py-1 text-sm leading-6 text-gray-900 transition-colors hover:bg-purple-400">
														Ver Proyecto
													</Link>
												</MenuItem>
												{project.manager === user._id && (
													<>
														<MenuItem>
															<Link
																to={`/projects/${project._id}/edit`}
																className="block px-3 py-1 text-sm leading-6 text-gray-900 transition-colors hover:bg-purple-400">
																Editar Proyecto
															</Link>
														</MenuItem>
														<MenuItem>
															<button
																type="button"
																className="block w-full px-3 py-1 text-sm leading-6 text-red-500 transition-colors hover:bg-red-600 hover:text-white text-start"
																onClick={() => mutate(project._id)}>
																Eliminar Proyecto
															</button>
														</MenuItem>
													</>
												)}
											</MenuItems>
										</Transition>
									</Menu>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="py-20 text-center">
						No hay proyectos a&uacute;n {""}
						<Link to="/projects/create" className="font-bold text-fuchsia-500">
							Crear Proyectos
						</Link>
					</p>
				)}
			</>
		);
}
