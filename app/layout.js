import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./components/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Stoxie - Modern Stock Market Dashboard",
  description: "Your gateway to intelligent investing. Track, analyze, and grow your portfolio with real-time market insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased font-light`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
