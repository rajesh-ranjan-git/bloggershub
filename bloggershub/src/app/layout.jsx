import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/header";
import StoreProvider from "../store/storeProvider/storeProvider";
import CheckAuth from "@/components/common/checkAuth";

export const metadata = {
  title: "Blogger's Hub",
  description: "Welcome to Blogger's Hub App.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StoreProvider>
        <body>
          <CheckAuth>
            <Header />
            {children}
            <Toaster />
          </CheckAuth>
        </body>
      </StoreProvider>
    </html>
  );
}
