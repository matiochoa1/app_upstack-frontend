import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
	status: string;
};
export default function DropTask({ status }: DropTaskProps) {
	const { isOver, setNodeRef } = useDroppable({
		id: status,
	});

	const style = {
		opacity: isOver ? 0.4 : undefined,
	};

	return (
		<>
			<div
				style={style}
				ref={setNodeRef}
				className="grid p-2 mt-5 text-xs font-semibold uppercase border border-dashed border-slate-500 place-content-center text-slate-500">
				Soltar tarea aqui
			</div>
		</>
	);
}
