"use client";

import { Box, Text } from "@chakra-ui/react";

interface IMenuItem {
  label: string;
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: IMenuItem) => {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      w="full"
      py=".5rem"
      px="1rem"
      display="flex"
      justifyContent="flex-start"
      transitionDuration={".5"}
      _hover={{ backgroundColor: "#f7f7f7" }}
    >
      <Text fontWeight="600" fontSize=".9rem" textAlign="left">
        {label}
      </Text>
    </Box>
  );
};

export default MenuItem;
