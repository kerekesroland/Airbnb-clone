import { Flex } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Categories = (props: Props) => {
  return (
    <Flex marginInline="auto" maxW="2520px">
      <Flex
        padding="1rem"
        justifyContent="space-between"
        overflowX="auto"
        alignItems="center"
      >
        Rolca
      </Flex>
    </Flex>
  );
};

export default Categories;
