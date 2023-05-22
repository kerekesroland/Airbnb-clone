import ClientOnly from "@/app/components/ClientOnly";
import ListingDetails from "@/app/components/ListingDetails/ListingDetails";
import { getAllListings } from "@/app/queries/getAllListings";
import { getListing } from "@/app/queries/getListing";
import { getReservations } from "@/app/queries/getReservations";
import getCurrentUser from "@/app/utils/getCurrentUser";
import React from "react";

interface IParams {
  id: string;
  userId: string;
  authorId: string;
}

// export const revalidate = 300;

// export const generateStaticParams = async () => {
//   const listings = await getAllListings();
//   return listings?.map((listing) => {
//     return {
//       id: listing?.id,
//     };
//   });
// };

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListing(params.id);
  const reservations = await getReservations(params);
  const user = await getCurrentUser();

  // console.log(user);

  if (!listing || !user) {
    return <></>;
  }
  return (
    <ClientOnly>
      <ListingDetails
        user={user}
        listing={listing}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
