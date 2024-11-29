import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
	const { data, isError, isLoading } = useAuth();

	if (isLoading) return "Cargando...";

	if (isError || !data) {
		return <Navigate to={"/auth/login"} />;
	}

	if (data)
		return (
			<>
				<header className="py-5 bg-gray-800">
					<div className="flex flex-col items-center justify-between mx-auto max-w-screen-2xl lg:flex-row">
						<div className="w-64">
							<Logo />
						</div>

						<NavMenu username={data.name} />
					</div>
				</header>

				<section className="p-5 mx-auto mt-10 max-w-screen-2xl">
					<Outlet />
				</section>

				<footer className="py-5">
					<p className="text-lg text-center">
						Todos los derechos reservados &copy; {new Date().getFullYear()}
					</p>
				</footer>

				<ToastContainer
					theme="dark"
					position="top-right"
					transition={Zoom}
					autoClose={3000}
				/>
			</>
		);
}
