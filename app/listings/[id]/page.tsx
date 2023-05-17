import ClientOnly from "@/app/components/ClientOnly";
import ListingDetails from "@/app/components/ListingDetails/ListingDetails";
import { getListing } from "@/app/queries/getListing";
import getCurrentUser from "@/app/utils/getCurrentUser";
import React from "react";

const ListingPage = async ({ params }: { params: { id: string } }) => {
  const listing = await getListing(params.id);
  const user = await getCurrentUser();
  if (!listing || !user) {
    return <></>;
  }
  return (
    <ClientOnly>
      <ListingDetails user={user} listing={listing} />
    </ClientOnly>
  );
};

export default ListingPage;
