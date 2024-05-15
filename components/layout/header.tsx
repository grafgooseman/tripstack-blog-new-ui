import Image from "next/image";
import ThemeToggle from "@/components/ui/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";



export default function Header() {
	return (
		<header className="mb-5">
			<div>
				<Container className="flex gap-5 justify-center items-center my-4">
					<h1 className="flex-grow text-xl">TripStack Blog x AI</h1>
					<ThemeToggle />
				</Container>
			</div>
			<Separator />
		</header>
	);
}
