"use client";

import { IReservation, IUser } from "@/app/models";
import { Box, Flex } from "@chakra-ui/react";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import styles from "./MyTrips.module.scss";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Listing from "../Listing/Listing";
interface IProps {
  reservations: Array<IReservation>;
  user: IUser | null;
}

const MyTrips = ({ user, reservations }: IProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string>("");

  const handleCancelReservation = useCallback(
    async (id: string) => {
      setDeleteId(id);
      try {
        await axios.delete(`/api/reservations/${id}`);
        toast.success("Successfully canceled reservation!");
        router.refresh();
      } catch (error) {
        toast.error("Error while cancelling reservation!");
      } finally {
        setDeleteId("");
      }
    },
    [router]
  );

  return (
    <Flex padding="1rem 2rem" flexDirection="column">
      <GeneralHeader
        title="Trips"
        subTitle="What places have you visited and where are you headed?"
      />
      <Box className={styles.trips__container}>
        {reservations.map((reservation) => (
          <Listing
            key={reservation?.id}
            actionId={reservation?.id}
            actionLabel="Cancel Reservation"
            onAction={handleCancelReservation}
            disabled={deleteId === reservation?.id}
            reservation={reservation}
            listing={reservation?.listing}
            user={user}
          />
        ))}
      </Box>
    </Flex>
  );
};

export default MyTrips;
