"use client";

import { Flex, Box } from "@chakra-ui/react";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import Listing from "../Listing/Listing";
import styles from "./MyReservations.module.scss";
import { IReservation, IUser } from "@/app/models";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

interface IProps {
  user: IUser;
  reservations: Array<IReservation>;
}

const MyReservations = ({ user, reservations }: IProps) => {
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
    <Flex className={styles.main__container}>
      <GeneralHeader
        title="Reservations"
        subTitle="What places have you visited and where are you headed?"
      />
      <Box className={styles.reservations__container}>
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

export default MyReservations;
