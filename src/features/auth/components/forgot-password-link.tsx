import { Link } from "@tanstack/react-router";

const ForgotPasswordLink = () => {
	return (
		<Link
			className="ml-auto text-sm underline-offset-4 hover:underline"
			to="/forgot-password"
		>
			Forgot your password?
		</Link>
	);
};

export default ForgotPasswordLink;
