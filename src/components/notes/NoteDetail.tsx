import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { deleteNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type NoteDetailProps = {
	note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
	const { data, isLoading } = useAuth();
	const params = useParams();
	const projectId = params.projectId!;

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const taskId = queryParams.get("viewTask")!;

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: deleteNote,
		onError: (error) => {
			toast.error(error.message);
		},
		onSuccess: (data) => {
			toast.success(data);
			queryClient.invalidateQueries({ queryKey: ["task", taskId] });
		},
	});

	const canDeleteNote = useMemo(() => data?._id === note.createdBy._id, [data]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<>
			<div className="flex items-center justify-between p-3">
				<div>
					<p>
						{note.content} por:{" "}
						<span className="font-bold">{note.createdBy.name}</span>
					</p>
					<p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
				</div>

				{canDeleteNote && (
					<button
						type="button"
						onClick={() => mutate({ projectId, taskId, noteId: note._id })}
						className="p-2 text-xs text-center text-white transition-colors bg-red-500 border border-red-800 rounded-lg cursor-pointer hover:bg-red-400">
						Eliminar
					</button>
				)}
			</div>
		</>
	);
}
