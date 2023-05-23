"use client";

import { IListing, IUser } from "@/app/models";
import styles from "./MyProperties.module.scss";
import { Flex, Box } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import Listing from "../Listing/Listing";

interface IProps {
  user: IUser;
  listings: Array<IListing>;
}

const MyProperties = ({ user, listings }: IProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string>("");

  const handleCancelProperty = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        await axios.delete(`/api/properties/${id}`);
        toast.success("Successfully deleted property!");
        router.refresh();
      } catch (error) {
        toast.error("Error while deleting property!");
      } finally {
        setDeleteId("");
      }
    },
    [router]
  );
  return (
    <Flex className={styles.main__container}>
      <GeneralHeader
        title="My Properties"
        subTitle="See what properties you have currently!"
      />
      <Box className={styles.properties__container}>
        {listings.map((listing) => (
          <Listing
            key={listing?.id}
            actionId={listing?.id}
            actionLabel="Remove Property"
            onAction={handleCancelProperty}
            disabled={deleteId === listing?.id}
            listing={listing}
            user={user}
          />
        ))}
      </Box>
    </Flex>
  );
};

export default MyProperties;
