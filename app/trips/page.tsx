import React from "react";
import getCurrentUser from "../utils/getCurrentUser";
import { getReservations } from "../queries/getReservations";
import NoInfo from "../components/NoInfo/NoInfo";
import ClientOnly from "../components/ClientOnly";
import MyTrips from "../components/MyTrips/MyTrips";

const Trips = async () => {
  const user = await getCurrentUser();
  const reservations = await getReservations({ userId: user?.id });

  if (!user) {
    return <NoInfo title="You are not authorized" subtitle="Please log in!" />;
  }
  if (!reservations) {
    <NoInfo title="No trips yet" subtitle="Try making some!" />;
  }
  return (
    <ClientOnly>
      <MyTrips />
    </ClientOnly>
  );
};

export default Trips;
