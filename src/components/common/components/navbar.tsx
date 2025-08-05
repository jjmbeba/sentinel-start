import { Link, useRouterState } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import UserMenu from "./user-menu";

const Navbar = () => {
	const {
		location: { pathname },
	} = useRouterState();
	const disallowedRoutes = new Set([
		"/login",
		"/sign-up",
		"forgot-password",
		"reset-password",
	]);

	if (disallowedRoutes.has(pathname)) {
		return null;
	}

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-6 py-3">
				<nav className="flex gap-4 text-md">
					<Link
						activeProps={{
							className: "underline",
						}}
						className={cn(
							buttonVariants({
								variant: "link",
								size: "sm",
								effect: "hoverUnderline",
							})
						)}
						to="/"
					>
						Home
					</Link>
					<Link
						className={cn(
							buttonVariants({
								variant: "link",
								size: "sm",
								effect: "hoverUnderline",
							})
						)}
						to="/dashboard"
					>
						Dashboard
					</Link>
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
};

export default Navbar;
