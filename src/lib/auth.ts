import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { resetPasswordHtml } from "./generate-email";
import { resend } from "./resend";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ url, user }) => {
			const { error } = await resend.emails.send({
				from: "Acme <onboarding@resend.dev>",
				to: ["delivered@resend.dev"], // TODO: change to user.email on production
				subject: "Reset your password",
				html: resetPasswordHtml(url, user.email),
			});

			if (error) {
				throw new Error(error.message);
			}
		},
	},
	rateLimit: {
		window: 60,
		max: 5,
	},
});
