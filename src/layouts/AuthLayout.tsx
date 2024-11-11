import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

export default function AuthLayout() {
	return (
		<>
			<div className="min-h-screen bg-gray-800">
				<div className="py-10 lg:py-20 mx-auto w-[450px]">
					<Logo />
					<div className="mt-10">
						<Outlet />
					</div>
				</div>
			</div>

			<ToastContainer
				theme="dark"
				position="top-right"
				transition={Zoom}
				autoClose={3000}
			/>
		</>
	);
}
