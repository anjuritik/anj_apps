import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import * as Icons from "./icons.js";

export type Route = {
	title: string;
	label: string;
	icon: ComponentType<Icon>;
	path: string;
	variant: "default" | "ghost";
};

export const primaryRoutes: Route[] = [
	{
		title: "Messages",
		label: "",
		icon: Icons.Inbox,
		variant: "default",
		path: "/admin/messages",
	},
	{
		title: "Status",
		label: "",
		icon: Icons.CircleAlert,
		variant: "ghost",
		path: "/admin/status",
	}
];

export const secondaryRoutes: Route[] = [
	{
		title: "DA",
		label: "",
		icon: Icons.Archive,
		variant: "ghost",
		path: "/da",
	},
	{
		title: "RR",
		label: "",
		icon: Icons.Archive,
		variant: "ghost",
		path: "/rr",
	},
	{
		title: "PO",
		label: "",
		icon: Icons.Archive,
		variant: "ghost",
		path: "/po",
	}
];
