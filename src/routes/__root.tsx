// src/routes/__root.tsx
/// <reference types="vite/client" />

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import appCss from "@/styles/app.css?url";

const themeScript = `
(function() {
    const theme = localStorage.getItem('vite-ui-theme') || 'dark';
    const root = document.documentElement;
    
    if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
    } else {
        root.classList.add(theme);
    }
})();
`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap",
			},
		],
		scripts: [
			{
				children: themeScript,
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			{/** biome-ignore lint/style/noHeadElement: Tanstack start does not have a head element */}
			<head>
				<HeadContent />
			</head>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<body>
					{children}
					<Toaster richColors />
					<Scripts />
				</body>
			</ThemeProvider>
			<TanStackRouterDevtools position="bottom-left" />
			{/* <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" /> */}
		</html>
	);
}
