import { Dispatch, SetStateAction } from "react";
import { ConfirmToken } from "@/types/index";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { validateToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
	token: ConfirmToken["token"];
	setToken: Dispatch<SetStateAction<string>>;
	setValidToken: Dispatch<SetStateAction<boolean>>;
};

export default function NewPasswordToken({
	token,
	setToken,
	setValidToken,
}: NewPasswordTokenProps) {
	const { mutate } = useMutation({
		mutationFn: validateToken,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
		},
	});

	const handleChange = (token: ConfirmToken["token"]) => {
		setToken(token);
		setValidToken(true);
	};
	const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

	return (
		<>
			<form className="p-10 mt-10 space-y-8 bg-white rounded-lg">
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
					to="/auth/forgot-password"
					className="font-normal text-center text-gray-300">
					Solicitar un nuevo Código
				</Link>
			</nav>
		</>
	);
}
