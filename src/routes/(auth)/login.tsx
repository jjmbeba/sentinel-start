import { createFileRoute } from "@tanstack/react-router";
import AuthContainer from "@/features/auth/common/auth-container";
import { LoginForm } from "@/features/auth/forms/login-form";

export const Route = createFileRoute("/(auth)/login")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title: "Login | Sentinel",
			},
		],
	}),
});

function RouteComponent() {
	return <AuthContainer authForm={<LoginForm />} type="login" />;
}
