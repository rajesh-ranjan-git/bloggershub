import "./globals.css";

export const metadata = {
  title: "Blogger's Hub",
  description: "Welcome to Blogger's Hub App.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
