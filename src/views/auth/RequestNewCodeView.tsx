import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { RequestConfirmationCodeForm } from "@/types/index";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RequestNewCodeView() {
	const initialValues: RequestConfirmationCodeForm = {
		email: "",
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<RequestConfirmationCodeForm>({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: requestConfirmationCode,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
		mutate(formData);

	return (
		<>
			<h1 className="text-5xl font-black text-white">
				Solicitar Código de Confirmación
			</h1>
			<p className="mt-5 text-2xl font-light text-white">
				Coloca tu e-mail para recibir {""}
				<span className="font-bold text-fuchsia-500"> un nuevo código</span>
			</p>

			<form
				onSubmit={handleSubmit(handleRequestCode)}
				className="p-10 mt-10 space-y-8 bg-white rounded-lg"
				noValidate>
				<div className="flex flex-col gap-5">
					<label htmlFor="email" className="text-2xl font-normal">
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Email de registro"
						className="w-full p-3 border border-gray-300 rounded-lg"
						{...register("email", {
							required: "El correo electrónico es requerido",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "El correo electrónico no es válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<input
					type="submit"
					value="Enviar Código"
					className="w-full p-3 text-xl font-black text-white rounded-lg cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
				/>
			</form>

			<nav className="flex flex-col mt-10 space-y-4">
				<Link
					to="/auth/login"
					className="font-normal text-center text-gray-300">
					¿Ya tienes cuenta?{" "}
					<span className="text-fuchsia-500">Iniciar Sesión</span>
				</Link>
				<Link
					to="/auth/forgot-password"
					className="font-normal text-center text-gray-300">
					¿Olvidaste tu contraseña?{" "}
					<span className="text-fuchsia-500">Reestablecer</span>
				</Link>
			</nav>
		</>
	);
}
