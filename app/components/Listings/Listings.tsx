"use client";
import { Box } from "@chakra-ui/react";
import React from "react";
import Listing from "../Listing/Listing";
import { IListing } from "@/inferfaces/IListing";
import styles from "./Listings.module.scss";
import { IUser } from "@/app/models";

interface IProps {
  listings: IListing[];
  user: IUser | null;
}

const Listings = ({ listings, user }: IProps) => {
  return (
    <Box className={styles.container}>
      {listings.map((listing) => (
        <Listing user={user} key={listing.id} listing={listing} />
      ))}
    </Box>
  );
};

export default Listings;
