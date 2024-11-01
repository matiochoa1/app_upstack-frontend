import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
	errors: FieldErrors<TaskFormData>;
	register: UseFormRegister<TaskFormData>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
	return (
		<>
			<div className="flex flex-col gap-5">
				<label className="text-2xl font-normal" htmlFor="name">
					Nombre de la tarea
				</label>
				<input
					id="taskName"
					type="text"
					placeholder="Nombre de la tarea"
					className="w-full p-3 border border-gray-300"
					{...register("taskName", {
						required: "El nombre de la tarea es obligatorio",
					})}
				/>
				{errors.taskName && (
					<ErrorMessage>{errors.taskName.message}</ErrorMessage>
				)}
			</div>

			<div className="flex flex-col gap-5">
				<label className="text-2xl font-normal" htmlFor="description">
					Descripción de la tarea
				</label>
				<textarea
					id="description"
					placeholder="Descripción de la tarea"
					className="w-full p-3 border border-gray-300"
					{...register("description", {
						required: "La descripción de la tarea es obligatoria",
					})}
				/>
				{errors.description && (
					<ErrorMessage>{errors.description.message}</ErrorMessage>
				)}
			</div>
		</>
	);
}
