import { createFileRoute } from "@tanstack/react-router";
import AuthContainer from "@/features/auth/common/auth-container";
import { ForgotPasswordForm } from "@/features/auth/forms/forgot-password-form";

export const Route = createFileRoute("/(auth)/forgot-password")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthContainer authForm={<ForgotPasswordForm />} type="login" />;
}
