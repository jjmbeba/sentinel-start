import { Resend } from "resend";
import { must } from "./shared";

export const resend = new Resend(
	must(
		process.env.RESEND_API_KEY,
		"RESEND_API_KEY environment variable is not set"
	)
);
