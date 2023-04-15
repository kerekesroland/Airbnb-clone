"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Logo } from "../Icons/Icons";
import SearchBar from "./Searchbar";
import Auth from "./Auth";

const Navbar = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      height="80px"
      padding="0rem 4rem"
      borderBottom="1px solid #eeeeee"
    >
      <Flex
        justifyContent="space-between"
        alignContent="center"
        w="100%"
        maxW="1760px"
        mx="auto"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Logo />
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
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
