import { useNavigate } from "react-router-dom";

export default function Logo() {
	const navigate = useNavigate();

	return (
		<>
			<img
				src="/logo.svg"
				alt="Logotipo UpStack"
				onClick={() => navigate("/")}
				className="cursor-pointer"
			/>
		</>
	);
}
