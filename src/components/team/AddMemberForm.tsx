import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import SearchResults from "./SearchResults";

export default function AddMemberForm() {
	const initialValues: TeamMemberForm = {
		email: "",
	};
	const params = useParams();
	const projectId = params.projectId!;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const mutation = useMutation({
		mutationFn: findUserByEmail,
	});

	const handleSearchUser = async (formData: TeamMemberForm) => {
		const data = { projectId, formData };

		mutation.mutate(data);
	};

	const resetData = () => {
		reset();
		mutation.reset();
	};

	return (
		<>
			<form
				className="mt-10 space-y-5"
				onSubmit={handleSubmit(handleSearchUser)}
				noValidate>
				<div className="flex flex-col gap-3">
					<label className="text-2xl font-normal" htmlFor="name">
						E-mail de Usuario
					</label>
					<input
						id="name"
						type="text"
						placeholder="E-mail del usuario a Agregar"
						className="w-full p-3 border border-gray-300"
						{...register("email", {
							required: "El Email es obligatorio",
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
					className="w-full p-3 text-xl font-black text-white cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700"
					value="Buscar Usuario"
				/>
			</form>

			<div className="mt-10">
				{mutation.isPending && <p className="text-center ">Cargando...</p>}
				{mutation.error && (
					<p className="text-center">{mutation.error.message}</p>
				)}
				{mutation.data && (
					<SearchResults user={mutation.data.user} reset={resetData} />
				)}
			</div>
		</>
	);
}
