"use client";
import styles from "./Navbar.module.scss";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Logo } from "../Icons/Icons";
import SearchBar from "./Searchbar";
import Auth from "./Auth";

const Navbar = () => {
  return (
    <Box className={styles.nav__container}>
      <Flex className={styles.nav_items__container}>
        <Box className={styles.logo__container}>
          <Logo />
        </Box>
        <Box className={styles.search__container}>
          <SearchBar />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Auth />
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
