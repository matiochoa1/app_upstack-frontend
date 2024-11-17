import { Fragment } from "react";
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { User } from "../types";

type NavMenuProps = {
	username: User["name"];
};

export default function NavMenu({ username }: NavMenuProps) {
	return (
		<Popover className="relative">
			<PopoverButton className="inline-flex items-center p-1 mr-2 text-sm font-semibold leading-6 bg-purple-400 rounded-lg gap-x-2">
				<Bars3Icon className="w-8 h-8 text-white " />
			</PopoverButton>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1">
				<PopoverPanel className="absolute z-10 flex w-screen mt-5 -translate-x-1/2 left-1/2 lg:max-w-min lg:-translate-x-48">
					<div className="w-full p-4 text-sm font-semibold leading-6 text-gray-900 bg-white shadow-lg lg:w-56 shrink rounded-xl ring-1 ring-gray-900/5">
						<p className="text-center">Hola: {username} !</p>
						<Link
							to="/profile"
							className="block p-2 rounded-lg hover:bg-purple-400">
							Mi Perfil
						</Link>
						<Link to="/" className="block p-2 rounded-lg hover:bg-purple-400">
							Mis Proyectos
						</Link>
						<button
							className="block w-full p-2 rounded-lg hover:bg-purple-500 text-start"
							type="button"
							onClick={() => {}}>
							Cerrar Sesión
						</button>
					</div>
				</PopoverPanel>
			</Transition>
		</Popover>
	);
}
