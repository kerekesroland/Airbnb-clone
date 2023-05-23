import React from "react";
import ClientOnly from "../components/ClientOnly";
import MyReservations from "../components/MyReservations/MyReservations";
import { IUser } from "../models";
import getCurrentUser from "../utils/getCurrentUser";
import { getReservations } from "../queries/getReservations";
import NoInfo from "../components/NoInfo/NoInfo";

const Reservations = async () => {
  const user: IUser | null = await getCurrentUser();

  if (!user) {
    return <NoInfo title="You are not authorized" subtitle="Please log in!" />;
  }

  const reservations = await getReservations({ authorId: user.id });

  if (reservations.length === 0) {
    return (
      <NoInfo
        title="No reservations yet"
        subtitle="As of now you don't have any reservations made!"
      />
    );
  }

  return <MyReservations user={user} reservations={reservations} />;
};

export default Reservations;
