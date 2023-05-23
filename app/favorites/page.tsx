import React from "react";
import NoInfo from "../components/NoInfo/NoInfo";
import { IUser } from "../models";
import getCurrentUser from "../utils/getCurrentUser";
import MyFavorites from "../components/MyFavorites/MyFavorites";
import { getAllFavorites } from "../queries/getFavorites";

const Favorites = async () => {
  const user: IUser | null = await getCurrentUser();

  if (!user) {
    return <NoInfo title="You are not authorized" subtitle="Please log in!" />;
  }

  if (user.favourites.length === 0) {
    return <NoInfo title="No Favorites yet" subtitle="Try adding some!" />;
  }

  const favorites = await getAllFavorites();

  return <MyFavorites user={user} favorites={favorites} />;
};

export default Favorites;
