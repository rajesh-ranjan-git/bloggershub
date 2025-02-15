import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/header";
import StoreProvider from "./storeProvider";

export const metadata = {
  title: "Blogger's Hub",
  description: "Welcome to Blogger's Hub App.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          <Header />
          {children}
          <Toaster />
        </body>
      </StoreProvider>
    </html>
  );
}
