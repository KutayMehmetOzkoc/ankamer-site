import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer";
import SetHtmlLang from "@/components/SetHtmlLang";
import { LocaleProvider } from "@/context/LocaleContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <LocaleProvider>
          <SetHtmlLang />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}