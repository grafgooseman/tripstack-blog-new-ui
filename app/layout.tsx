import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import { Container } from "@/components/ui/container";
import Footer from "@/components/layout/footer"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "TripStack Blog x AI",
  description: "Created my Artem Gusev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header/>
          <Container>
            {children}
          </Container>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
