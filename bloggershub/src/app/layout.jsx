import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/header";

export const metadata = {
  title: "Blogger's Hub",
  description: "Welcome to Blogger's Hub App.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
