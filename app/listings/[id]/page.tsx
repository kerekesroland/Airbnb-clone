import ClientOnly from "@/app/components/ClientOnly";
import ListingDetails from "@/app/components/ListingDetails/ListingDetails";
import { getListing } from "@/app/queries/getListing";
import { getReservations } from "@/app/queries/getReservations";
import getCurrentUser from "@/app/utils/getCurrentUser";
import React from "react";

interface IParams {
  id: string;
  userId: string;
  authorId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const user = await getCurrentUser();
  const listing = await getListing(params.id);
  const reservations = await getReservations(params);

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
