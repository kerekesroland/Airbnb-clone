import { IListing } from "@/inferfaces/IListing";
import ClientOnly from "./components/ClientOnly";
import Listings from "./components/Listings/Listings";
import NoListings from "./components/NoListings/NoListings";
import { getAllListings } from "./queries/getAllListings";

export default async function Home() {
  const listings: IListing[] = await getAllListings();

  if (listings.length === 0) {
    return <NoListings />;
  }

  return (
    <ClientOnly>
      <Listings listings={listings} />
    </ClientOnly>
  );
}
