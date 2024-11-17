import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/AuthAPI";

export const useAuth = () => {
	const { data, isError, isLoading } = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
		retry: 1,
		refetchOnWindowFocus: false, // es para evitar que se refresque la pagina cuando se cambia de pestaña
	});

	return { data, isError, isLoading };
};
