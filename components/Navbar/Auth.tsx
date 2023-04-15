"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ProfileIcon } from "../Icons/Icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiWorld } from "react-icons/tfi";

const Auth = () => {
  return (
    <Flex alignItems="center" justifyContent="center" gap=".3rem">
      <Box
        cursor="pointer"
        p="12px"
        borderRadius="22px"
        _hover={{ backgroundColor: "#f7f7f7" }}
      >
        <Text fontSize="14px" fontWeight="700" color="#222">
          Airbnb your home
        </Text>
      </Box>
      <Box
        cursor="pointer"
        p="12px"
        borderRadius="22px"
        _hover={{ backgroundColor: "#f7f7f7" }}
      >
        <TfiWorld cursor="pointer" />
      </Box>

      <Flex
        gap="1rem"
        padding="5px 5px 5px 12px"
        justifyContent="center"
        alignItems="center"
        background="transparent"
        cursor="pointer"
        margin="0"
        textAlign="inherit"
        border="1px solid #e0e0e0"
        borderRadius="21px"
        transition="boxShadow 0.2s ease"
        _hover={{ boxShadow: "0px 5px 5px 0px rgb(224,224,224)" }}
      >
        <RxHamburgerMenu cursor="pointer" />
        <ProfileIcon />
      </Flex>
    </Flex>
  );
};
export default Auth;
