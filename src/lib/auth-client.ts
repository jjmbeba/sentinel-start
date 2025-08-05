import { createAuthClient } from "better-auth/react";
import { must } from "./shared";

export const authClient = createAuthClient({
	baseURL: must(
		import.meta.env.VITE_BETTER_AUTH_URL,
		"VITE_BETTER_AUTH_URL is not set"
	),
});

export const {
	signIn,
	signUp,
	useSession,
	signOut,
	requestPasswordReset,
	resetPassword,
} = authClient;
