"use client";

import { IListing, IUser } from "@/app/models";
import styles from "./MyFavorites.module.scss";
import { Box, Flex } from "@chakra-ui/react";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import Listing from "../Listing/Listing";

interface IProps {
  user: IUser;
  favorites: Array<IListing>;
}

const MyFavorites = ({ user, favorites }: IProps) => {
  return (
    <Flex className={styles.main__container}>
      <GeneralHeader
        title="Favorites"
        subTitle="Here are your favorite listings!"
      />
      <Box className={styles.favorites__container}>
        {favorites.map((favorite) => (
          <Listing key={favorite?.id} listing={favorite} user={user} />
        ))}
      </Box>
    </Flex>
  );
};

export default MyFavorites;
