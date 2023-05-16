"use client";
import { Grid, Box } from "@chakra-ui/react";
import React from "react";
import Listing from "../Listing/Listing";
import { IListing } from "@/inferfaces/IListing";
import styles from "./Listings.module.scss";

interface IProps {
  listings: IListing[];
}

//todo add responsiveness

const Listings = ({ listings }: IProps) => {
  return (
    <Box className={styles.container}>
      {listings.map((listing) => (
        <Listing key={listing.id} listing={listing} />
      ))}
    </Box>
  );
};

export default Listings;
