"use client";

import { IListing, IReservation, IUser } from "@/app/models";
import { CATEGORIES } from "@/constants/categories";
import { Reservation } from "@prisma/client";
import React from "react";
import ListingHeader from "./ListingHeader";
import { Flex } from "@chakra-ui/react";
import ListingBasicInfo from "./ListingBasicInfo";
import { ICategory } from "@/inferfaces/ICategory";
import ListingHost from "./ListingHost";
import styles from "./ListingDetails.module.scss";

interface IProps {
  listing: IListing & {
    user: IUser;
  };
  reservations?: Array<IReservation>;
  user: IUser;
}

const ListingDetails = ({ listing, user, reservations }: IProps) => {
  const category = CATEGORIES.find(
    (cat) => cat.label === listing?.category
  ) as ICategory;

  return (
    <Flex className={styles.listingDetailsContainer}>
      <ListingHeader
        image={listing?.image}
        id={listing?.id}
        location={listing?.coordinates}
        title={listing?.title}
      />
      <Flex className={styles.listingDetailsInfo}>
        <ListingBasicInfo
          user={user}
          category={category}
          description={listing?.description}
          rooms={listing?.numberOfRooms}
          bathrooms={listing?.numberOfBathrooms}
          guests={listing?.numberOfGuests}
          location={listing?.coordinates}
        />
        <ListingHost
          reservations={reservations}
          listing={listing}
          user={user}
        />
      </Flex>
    </Flex>
  );
};

export default ListingDetails;
