import { revalidateLogic, useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import AuthSubmitBtn from "@/features/auth/components/auth-submit-btn.tsx";
import EmailInput from "@/features/auth/components/email-auth-input.tsx";
import FieldErrorMessage from "@/features/auth/components/field-error-msg.tsx";
import FormField from "@/features/auth/components/form-field.tsx";
import AuthFormHeader from "@/features/auth/components/form-header.tsx";
import PasswordInput from "@/features/auth/components/password-auth-input.tsx";
import { signUp } from "@/lib/auth-client.ts";
import { cn } from "@/lib/utils.ts";
import { signUpSchema } from "../schemas";

export function SignUpForm({
	className,
	...props
}: React.ComponentProps<"form">) {
	const navigate = useNavigate();
	const form = useForm({
		validationLogic: revalidateLogic({
			modeAfterSubmission: "change",
		}),
		validators: {
			onDynamicAsyncDebounceMs: 500,
			onDynamicAsync: signUpSchema,
		},
		defaultValues: {
			email: "",
			name: "",
			password: "",
			confirmPassword: "",
		},
		onSubmit: async ({ value }) => {
			await signUp.email(
				{
					...value,
				},
				{
					onSuccess: () => {
						navigate({ to: "/" });
						toast.success("Sign up successful");
					},
					onError: (error) => {
						toast.error(error.error.message);
					},
				}
			);
		},
	});

	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible((prevState) => !prevState);

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
				description="Enter your email below to create an account"
				title="Create an account"
			/>
			<div className="grid gap-6">
				<form.Field name="name">
					{(field) => (
						<div className="grid gap-3">
							<Label htmlFor="name">Full Name</Label>
							<div className="relative">
								<Input
									aria-invalid={!!field.state.meta.errors.length}
									className="peer pe-9"
									id="name"
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="John Doe"
									value={field.state.value}
								/>
								<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
									<UserIcon aria-hidden="true" size={16} />
								</div>
							</div>
							{field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
						</div>
					)}
				</form.Field>
				<form.Field name="email">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							htmlFor="email"
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
				<form.Field name="password">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							htmlFor="password"
							label="Password"
						>
							<PasswordInput
								hasErrors={!!field.state.meta.errors.length}
								isVisible={isVisible}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								toggleVisibility={toggleVisibility}
								value={field.state.value}
							/>
						</FormField>
					)}
				</form.Field>
				<form.Field name="confirmPassword">
					{(field) => (
						<FormField
							errors={field.state.meta.errors.map((error) => (
								<FieldErrorMessage
									key={error?.message}
									message={error?.message}
								/>
							))}
							htmlFor="confirmPassword"
							label="Confirm Password"
						>
							<PasswordInput
								hasErrors={!!field.state.meta.errors.length}
								isVisible={isVisible}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								toggleVisibility={toggleVisibility}
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
							canSubmit={canSubmit ?? true}
							label="Sign up"
							loading={isSubmitting ?? false}
							submittingLabel="Signing up..."
						/>
					)}
				</form.Subscribe>
			</div>
			<div className="text-center text-sm">
				Already have an account?{" "}
				<Link className="underline underline-offset-4" to="/login">
					Login
				</Link>
			</div>
		</form>
	);
}
