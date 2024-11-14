import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Link } from "react-router-dom";

export default function NewPasswordToken() {
	const handleChange = (token: string) => {};
	const handleComplete = (token: string) => {};

	return (
		<>
			<form className="p-10 mt-10 space-y-8 bg-white rounded-lg">
				<label className="block text-2xl font-normal text-center">
					Código de 6 dígitos
				</label>
				<div className="flex justify-center gap-5">
					<PinInput
						value={"123456"}
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
