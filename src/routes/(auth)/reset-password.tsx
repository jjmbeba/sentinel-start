import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import AuthContainer from "@/features/auth/common/auth-container";
import { ResetPasswordForm } from "@/features/auth/forms/reset-password-form";

export const Route = createFileRoute("/(auth)/reset-password")({
	component: RouteComponent,
	validateSearch: z.object({
		token: z.string(),
	}),
});

function RouteComponent() {
	return <AuthContainer authForm={<ResetPasswordForm />} type="login" />;
}
