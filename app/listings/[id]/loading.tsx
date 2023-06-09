"use client";

import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import styles from "../../page.module.scss";

const LoadingSkeleton = () => {
  return (
    <Box className={styles.listingDetailsContainer}>
      <Skeleton height="20px" width="200px" />
      <Skeleton mt="8px" height="20px" width="50px" />
      <Box>
        <Skeleton borderRadius="10px" mt="1rem" minHeight="60vh" width="100%" />
        <Flex
          width="100%"
          justifyContent="space-between"
          gap="2rem"
          alignItems="center"
        >
          <Flex width="100%" mt="64px" flexDirection="column">
            <Stack width="100%">
              <Skeleton mt="3px" height="20px" w="50%" />
              <Skeleton mt="3px" height="20px" w="50%" />
            </Stack>
            <Skeleton mt="65px" height="40px" />
            <Skeleton mt="65px" height="20px" />
            <Skeleton mt="33px" height="500px" />
          </Flex>
          <Skeleton h="550px" width="50%" borderRadius="10px" />
        </Flex>
      </Box>
    </Box>
  );
};

export default LoadingSkeleton;
