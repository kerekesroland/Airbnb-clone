"use client";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
const SearchBar = () => {
  return (
    <Flex
      padding="6px"
      borderRadius="40px"
      boxShadow="0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)"
      transition="box-shadow 0.2s ease"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      _hover={{ boxShadow: "0px 5px 5px 0px rgb(224,224,224)" }}
    >
      <Flex w="100%">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="6px 24px"
        >
          <Button fontSize="14px" fontWeight="700">
            Anywhere
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="6px 24px"
          borderLeft="1px solid #dddddd"
        >
          <Button fontSize="14px" fontWeight="700">
            Any week
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="6px 24px"
          borderLeft="1px solid #dddddd"
        >
          <Button fontSize="14px" fontWeight="500" color="#717171">
            Add guests
          </Button>
        </Box>
      </Flex>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        padding="10px"
        backgroundColor="#f9385d"
      >
        <FaSearch cursor="pointer" color="#fff" />
      </Box>
    </Flex>
  );
};

export default SearchBar;
