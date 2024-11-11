import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AtuhAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
	const [token, setToken] = useState<ConfirmToken["token"]>("");

	const handleChange = (token: ConfirmToken["token"]) => {
		setToken(token);
	};

	const { mutate } = useMutation({
		mutationFn: confirmAccount,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
		},
	});

	const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });
	return (
		<>
			<h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
			<p className="mt-5 text-2xl font-light text-white">
				Ingresa el código que recibiste {""}
				<span className="font-bold text-fuchsia-500"> por e-mail</span>
			</p>
			<form className="p-10 mt-10 space-y-8 bg-white">
				<label className="block text-2xl font-normal text-center">
					Código de 6 dígitos
				</label>

				<div className="flex justify-center gap-5">
					<PinInput
						value={token}
						onChange={handleChange}
						onComplete={handleComplete}>
						<PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
						<PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
						<PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
						<PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
						<PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
						<PinInputField className="w-10 h-10 p-3 placeholder-white border border-gray-300 rounded-lg" />
					</PinInput>
				</div>
			</form>

			<nav className="flex flex-col mt-10 space-y-4">
				<Link
					to="/auth/new-code"
					className="font-normal text-center text-gray-300">
					Solicitar un nuevo Código
				</Link>
			</nav>
		</>
	);
}
