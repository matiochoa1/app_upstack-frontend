import { Navigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TaskAPI";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
	const params = useParams(); // obtenemos los parametros de la url para obtener el id del proyecto
	const projectId = params.projectId!;

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search); // leemos la query string actual

	const taskId = queryParams.get("editTask")!;

	const { data, isError } = useQuery({
		queryKey: ["task", taskId],
		queryFn: () => getTaskById({ projectId, taskId }),
		enabled: !!taskId, // esto es para que no se ejecute la query si no hay un taskId
	});

	if (isError) return <Navigate to={"/404"} />;

	if (data) return <EditTaskModal data={data} taskId={taskId} />;
}
