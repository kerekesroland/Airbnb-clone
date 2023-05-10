"use client";
import { Box, Text } from "@chakra-ui/react";
import styles from "./RentModalHeader.module.scss";

interface IRentModalHeaderProps {
  title?: string;
  subTitle?: string;
  centered?: boolean;
}

const RentModalHeader = ({
  title,
  subTitle,
  centered,
}: IRentModalHeaderProps) => {
  return (
    <Box textAlign={centered ? "center" : "left"}>
      <Text fontWeight="bold" fontSize="1.5rem" mb=".5rem">
        {title}
      </Text>
      <Text color="edf2f7" opacity=".5" fontWeight={600} fontSize=".9rem">
        {subTitle}
      </Text>
    </Box>
  );
};

export default RentModalHeader;
