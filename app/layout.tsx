import "./globals.scss";

import { Nunito } from "next/font/google";

import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";

import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import { Providers } from "./components/providers";
import getCurrentUser from "./utils/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import FilterModal from "./components/modals/FilterModal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "Airbnb",
  description: "Airbnb by Roland",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <FilterModal />
          <Navbar user={user} />
        </ClientOnly>
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
