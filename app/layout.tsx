import "./globals.scss";
import { Providers } from "./components/providers";
import { Nunito } from "next/font/google";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import RegisterModal from "./components/modals/RegisterModal";
import ClientOnly from "./components/ClientOnly";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb by Roland",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
