import { IListing } from "@/inferfaces/IListing";
import ClientOnly from "./components/ClientOnly";
import Listings from "./components/Listings/Listings";
import NoListings from "./components/NoListings/NoListings";
import { IListingProps, getAllListings } from "./queries/getAllListings";
import getCurrentUser from "./utils/getCurrentUser";
import { IUser } from "./models";

interface IProps {
  searchParams: IListingProps;
}

export default async function Home({ searchParams }: IProps) {
  const listings: IListing[] = await getAllListings(searchParams);
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
