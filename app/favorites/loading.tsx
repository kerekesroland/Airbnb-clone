"use client";

import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";
import styles from "../page.module.scss";

const LoadingSkeleton = () => {
  return (
    <Flex className={styles.main__container}>
      <Skeleton height="20px" width="200px" />
      <Skeleton mt="8px" height="20px" width="250px" />

      <Box className={styles.reservations__container}>
        {[...Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])].map((item, idx) => (
          <Box key={idx}>
            <Skeleton borderRadius="12px" height="261px" width="281px" />
            <Stack mt="10px">
              <Skeleton mt="3px" height="20px" />
              <Skeleton mt="3px" height="20px" />
              <Skeleton mt="15px" height="20px" width="100px" />
            </Stack>
          </Box>
        ))}
      </Box>
    </Flex>
  );
};

export default LoadingSkeleton;
