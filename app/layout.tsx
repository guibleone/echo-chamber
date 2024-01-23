import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "./components/Navbar";
import { cn } from "@/lib/utils";
import Footer from "./components/Footer";
import MaxWidthWrapper from "@/components/max-width-warpper";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Echo Chamber",
  description: "Compartilhe seus pensamentos com o mundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(poppins.className, "flex flex-col min-h-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <div className="flex-1">
              <Navbar />
              <MaxWidthWrapper className="max-w-screen-md">{children}</MaxWidthWrapper>
            </div>

            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
