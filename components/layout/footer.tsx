import Image from "next/image";
import ThemeToggle from "@/components/ui/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";



export default function Footer() {
	return (
		<footer className="mt-5 pb-10">
			<Separator />
			<div>
				<Container className="flex gap-5 justify-center items-center my-4">
					<p className="flex-grow text-sm">Made by Artem Gusev as Web Scraping Demo for TripStack.com</p>
				</Container>
			</div>
		</footer>
	);
}