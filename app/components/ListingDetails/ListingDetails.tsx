"use client";

import { IListing, IUser } from "@/app/models";
import { CATEGORIES } from "@/constants/categories";
import { Reservation } from "@prisma/client";
import React from "react";
import ListingHeader from "./ListingHeader";
import { Flex } from "@chakra-ui/react";
import ListingBasicInfo from "./ListingBasicInfo";
import { ICategory } from "@/inferfaces/ICategory";
import useCountries from "@/hooks/useCountries";

interface IProps {
  listing: IListing & {
    user: IUser;
  };
  reservations?: Array<Reservation>;
  user: IUser;
}

const ListingDetails = ({ listing, user }: IProps) => {
  const category = CATEGORIES.find(
    (cat) => cat.label === listing?.category
  ) as ICategory;

  return (
    <Flex flexDirection="column" width="100%" mx="auto" padding="2rem 4rem">
      <ListingHeader
        image={listing?.image}
        id={listing?.id}
        location={listing?.coordinates}
        title="Header"
      />
      <ListingBasicInfo
        user={user}
        category={category}
        description={listing?.description}
        rooms={listing?.numberOfRooms}
        bathrooms={listing?.numberOfBathrooms}
        guests={listing?.numberOfGuests}
        location={listing?.coordinates}
      />
    </Flex>
  );
};

export default ListingDetails;
