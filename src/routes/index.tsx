// src/routes/index.tsx

import { createFileRoute } from "@tanstack/react-router";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSession } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const { data: session, isPending } = useSession();

	return (
		<div>
			<h1>Home page</h1>
			<ModeToggle />
			{isPending ? (
				<p>Loading...</p>
			) : (
				<pre>{JSON.stringify(session, null, 2)}</pre>
			)}
		</div>
	);
}
