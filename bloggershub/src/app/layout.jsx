import "./globals.css";
import StoreProvider from "@/store/storeProvider/storeProvider";
import { Toaster } from "@/components/ui/toaster";
import CheckAuth from "@/components/common/checkAuth";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

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
          <div className="w-full h-32"></div>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
}
