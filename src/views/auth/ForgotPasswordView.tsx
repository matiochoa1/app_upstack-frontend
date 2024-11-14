import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPasswordForm } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
	const initialValues: ForgotPasswordForm = {
		email: "",
	};
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: forgotPasswordForm,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const handleForgotPassword = (formData: ForgotPasswordForm) =>
		mutate(formData);

	return (
		<>
			<h1 className="text-4xl font-black text-center text-white">
				Reestablecer contraseña
			</h1>
			<p className="mt-5 text-xl font-light text-center text-white">
				Olvidaste tu contraseña? Ingresa tu correo y te enviaremos un correo
				<span className="font-bold text-fuchsia-500">
					{" "}
					para reestablecerla.
				</span>
			</p>
			<form
				onSubmit={handleSubmit(handleForgotPassword)}
				className="p-10 mt-10 space-y-8 bg-white"
				noValidate>
				<div className="flex flex-col gap-5">
					<label className="text-2xl font-normal" htmlFor="email">
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email de Registro"
						className="w-full p-3 border border-gray-300"
						{...register("email", {
							required: "El Email de registro es obligatorio",
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: "E-mail no válido",
							},
						})}
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<input
					type="submit"
					value="Enviar Instrucciones"
					className="w-full p-3 text-xl font-black text-white cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
				/>
			</form>

			<nav className="flex flex-col mt-10 space-y-4">
				<Link
					to={"/auth/login"}
					className="font-normal text-center text-gray-300">
					Ya tienes cuenta?{" "}
					<span className="font-bold text-fuchsia-500">Inicia Sesion</span>
				</Link>

				<Link
					to={"/auth/register"}
					className="font-normal text-center text-gray-300">
					No tienes una cuenta?{" "}
					<span className="font-bold text-fuchsia-500">Crea una</span>
				</Link>
			</nav>
		</>
	);
}
