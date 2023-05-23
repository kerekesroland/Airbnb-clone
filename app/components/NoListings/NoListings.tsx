"use client";

import { Flex, Text } from "@chakra-ui/react";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

const NoListings = () => {
  const router = useRouter();
  return (
    <Flex
      marginTop="6rem"
      height="60vh"
      flexDirection="column"
      alignItems="center"
      gap="1rem"
    >
      <Flex flexDirection="column" alignItems="center" gap=".5rem">
        <Text fontSize="1.2rem" fontWeight="700" lineHeight="1.2">
          No matches
        </Text>
        <Text fontWeight="700" opacity=".4" color="#717171" fontSize=".9rem">
          Try resetting some or all the filters
        </Text>
      </Flex>

      <Flex width="300px">
        <Button
          onClick={() => router.replace("/")}
          outline
          label="Reset filters"
        />
      </Flex>
    </Flex>
  );
};

export default NoListings;
