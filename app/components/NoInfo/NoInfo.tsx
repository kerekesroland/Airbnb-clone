"use client";

import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  title: string;
  subtitle: string;
}

const NoInfo = ({ title, subtitle }: IProps) => {
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
          {title}
        </Text>
        <Text fontWeight="700" opacity=".4" color="#717171" fontSize=".9rem">
          {subtitle}
        </Text>
      </Flex>
    </Flex>
  );
};

export default NoInfo;
