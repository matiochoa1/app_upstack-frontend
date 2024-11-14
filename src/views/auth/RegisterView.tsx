import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
	const initialValues: UserRegistrationForm = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	};

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<UserRegistrationForm>({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: createAccount,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			reset();
		},
	});

	const password = watch("password");

	const handleRegister = (formData: UserRegistrationForm) => mutate(formData);

	return (
		<>
			<h1 className="text-5xl font-black text-white">Crear Cuenta</h1>
			<p className="mt-5 text-2xl font-light text-white">
				Llena el formulario para
				<span className="font-bold text-fuchsia-500"> crear tu cuenta</span>
			</p>

			<form
				onSubmit={handleSubmit(handleRegister)}
				className="p-10 mt-10 space-y-8 bg-white"
				noValidate>
				<div className="flex flex-col gap-5">
					<label htmlFor="email" className="text-2xl font-normal">
						Email
					</label>
					<input
						type="email"
						id="email"
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

				<div className="flex flex-col gap-5">
					<label htmlFor="name" className="text-2xl font-normal">
						Nombre
					</label>
					<input
						type="text"
						id="name"
						placeholder="Nombre de Registro"
						className="w-full p-3 border border-gray-300"
						{...register("name", {
							required: "El Nombre de registro es obligatorio",
						})}
					/>
					{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
				</div>

				<div className="flex flex-col gap-5">
					<label htmlFor="password" className="text-2xl font-normal">
						Password
					</label>
					<input
						type="password"
						id="password"
						placeholder="Password de Registro"
						className="w-full p-3 border border-gray-300"
						{...register("password", {
							required: "El Password es obligatorio",
							minLength: {
								value: 8,
								message: "El Password debe tener al menos 8 caracteres",
							},
						})}
					/>
					{errors.password && (
						<ErrorMessage>{errors.password.message}</ErrorMessage>
					)}
				</div>

				<div className="flex flex-col gap-5">
					<label className="text-2xl font-normal">Repetir Password</label>

					<input
						type="password"
						id="password_confirmation"
						placeholder="Repite el Password"
						className="w-full p-3 border border-gray-300"
						{...register("password_confirmation", {
							required: "Repetir Password es obligatorio",
							validate: (value) =>
								value === password || "Los Password no coinciden",
						})}
					/>

					{errors.password_confirmation && (
						<ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
					)}
				</div>

				<input
					type="submit"
					value="Crear Cuenta"
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
					to={"/auth/forgot-password"}
					className="font-normal text-center text-gray-300">
					Olvidaste tu contraseña?{" "}
					<span className="font-bold text-fuchsia-500">Reestablecer</span>
				</Link>
			</nav>
		</>
	);
}
