import { createFileRoute } from "@tanstack/react-router";
import AuthContainer from "@/features/auth/common/auth-container";
import { SignUpForm } from "@/features/auth/forms/sign-up-form";

export const Route = createFileRoute("/(auth)/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthContainer authForm={<SignUpForm />} type="signup" />;
}
