import React from "react";
import getCurrentUser from "../utils/getCurrentUser";
import NoInfo from "../components/NoInfo/NoInfo";
import { getAllListings } from "../queries/getAllListings";
import MyProperties from "../components/MyProperties/MyProperties";

const Properties = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <NoInfo title="You are not authorized" subtitle="Please log in!" />;
  }

  const listings = await getAllListings({ userId: user?.id });

  if (listings.length === 0) {
    return <NoInfo title="No Properties yet" subtitle="Try uploading some!" />;
  }
  return <MyProperties user={user} listings={listings} />;
};

export default Properties;
