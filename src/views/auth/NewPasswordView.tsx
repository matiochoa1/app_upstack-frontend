import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
	const [token, setToken] = useState<ConfirmToken["token"]>("");
	const [isValidToken, setValidToken] = useState(false);

	return (
		<>
			<h1 className="text-4xl font-black text-center text-white">
				Reestablecer contraseña
			</h1>
			<p className="mt-5 text-xl font-light text-center text-white">
				Ingresa el codigo que recibiste
				<span className="font-bold text-fuchsia-500"> por correo.</span>
			</p>

			{!isValidToken ? (
				<NewPasswordToken
					token={token}
					setToken={setToken}
					setValidToken={setValidToken}
				/>
			) : (
				<NewPasswordForm token={token} />
			)}
		</>
	);
}
