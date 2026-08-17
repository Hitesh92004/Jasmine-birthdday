import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jasmine-birthday.vercel.app"),
  title: "For Jasmine ❤️",
  description: "Something special, just for you.",
  openGraph: {
    title: "For Jasmine ❤️",
    description: "Something special, just for you.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Jasmine ❤️",
    description: "Something special, just for you.",
    images: ["/images/og-image.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
