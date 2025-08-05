import { Input } from "@/components/ui/input.tsx";
import PasswordVisibilityToggle from "@/components/ui/password-visibility-toggle.tsx";

type Props = {
	isVisible: boolean;
	toggleVisibility: () => void;
	value: string;
	hasErrors: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
};

const PasswordInput = ({
	isVisible,
	toggleVisibility,
	value,
	hasErrors,
	onChange,
	onBlur,
}: Props) => {
	return (
		<>
			<Input
				aria-invalid={hasErrors}
				className="pe-9"
				id="password"
				onBlur={onBlur}
				onChange={onChange}
				type={isVisible ? "text" : "password"}
				value={value}
			/>
			<PasswordVisibilityToggle
				isVisible={isVisible}
				toggleVisibility={toggleVisibility}
			/>
		</>
	);
};

export default PasswordInput;
