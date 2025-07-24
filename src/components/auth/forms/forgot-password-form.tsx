import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import AuthSubmitBtn from "@/components/forms/auth/auth-submit-btn";
import EmailInput from "@/components/forms/auth/email-auth-input";
import AuthFormHeader from "@/components/forms/auth/form-header";
import FieldErrorMessage from "@/components/forms/field-error-msg";
import FormField from "@/components/forms/form-field";
import { requestPasswordReset } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema } from "../schemas";

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const form = useForm({
		validators: {
			onBlur: forgotPasswordSchema,
		},
		defaultValues: {
			email: "",
		},
		onSubmit: async ({ value: _value }) => {
			await requestPasswordReset(
				{
					email: _value.email,
					redirectTo: "/reset-password",
				},
				{
					onSuccess: () => {
						toast.success("Password reset email sent");
					},
					onError: (error) => {
						toast.error(error.error.message);
					},
				}
			);
		},
	});
	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault();

				form.handleSubmit();
			}}
			{...props}
		>
			<AuthFormHeader
				description="Enter your email below to reset your password"
				title="Forgot Password"
			/>
			<div className="grid gap-6">
				<form.Field name="email">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							htmlFor={field.name}
							label="Email"
						>
							<EmailInput
								hasErrors={!!field.state.meta.errors.length}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								value={field.state.value}
							/>
						</FormField>
					)}
				</form.Field>
				<form.Subscribe
					selector={({ isSubmitting, canSubmit }) => [isSubmitting, canSubmit]}
				>
					{([isSubmitting, canSubmit]) => (
						<AuthSubmitBtn
							canSubmit={canSubmit}
							label="Request Password Reset"
							loading={isSubmitting}
							submittingLabel="Requesting password reset..."
						/>
					)}
				</form.Subscribe>
			</div>
		</form>
	);
}
