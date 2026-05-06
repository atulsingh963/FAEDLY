import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FAEDLY | Modern AI-Powered EdTech",
  description: "Your personalized AI tutor, smart quizzes, and dynamic study paths.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://faedly.vercel.app"),
  openGraph: {
    title: "FAEDLY | AI-Powered EdTech Platform",
    description: "Your personalized AI tutor, smart quizzes, and dynamic study paths.",
    url: "/",
    siteName: "FAEDLY",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FAEDLY EdTech Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAEDLY | AI-Powered EdTech",
    description: "Your personalized AI tutor, smart quizzes, and dynamic study paths.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster position="bottom-right" theme="system" richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
