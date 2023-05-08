"use client";
import styles from "./Navbar.module.scss";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Logo } from "../Icons/Icons";
import SearchBar from "./Searchbar";
import Auth from "./Auth";
import { IUser } from "@/app/models";
import Categories from "../Categories/Categories";
import { useRouter } from "next/navigation";

interface IProps {
  user: IUser | null;
}

const Navbar = ({ user }: IProps) => {
  const router = useRouter();
  const handleGoToHome = () => {
    router.push("/");
  };
  return (
    <>
      <Box className={styles.nav__container}>
        <Flex className={styles.nav_items__container}>
          <Box onClick={handleGoToHome} className={styles.logo__container}>
            <Logo />
          </Box>
          <Box className={styles.search__container}>
            <SearchBar />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Auth user={user} />
          </Box>
        </Flex>
      </Box>
      <Categories />
    </>
  );
};

export default Navbar;
