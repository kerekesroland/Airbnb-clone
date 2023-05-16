import { IListing } from "@/inferfaces/IListing";
import ClientOnly from "./components/ClientOnly";
import Listings from "./components/Listings/Listings";
import NoListings from "./components/NoListings/NoListings";
import { getAllListings } from "./queries/getAllListings";
import getCurrentUser from "./utils/getCurrentUser";
import { IUser } from "./models";

export default async function Home() {
  const listings: IListing[] = await getAllListings();
  const user: IUser | null = await getCurrentUser();
  if (listings.length === 0) {
    return <NoListings />;
  }

  return (
    <ClientOnly>
      <Listings user={user} listings={listings} />
    </ClientOnly>
  );
}
