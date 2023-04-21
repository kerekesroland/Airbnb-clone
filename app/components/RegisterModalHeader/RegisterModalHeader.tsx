"use client";
import { Box, Text } from "@chakra-ui/react";
import styles from "./RegisterModalHeader.module.scss";

interface IRegisterModalHeaderProps {
  title?: string;
  subTitle?: string;
  centered?: boolean;
}

const RegisterModalHeader = ({
  title,
  subTitle,
  centered,
}: IRegisterModalHeaderProps) => {
  return (
    <Box textAlign={centered ? "center" : "left"}>
      <Text fontWeight="bold" fontSize="1.5rem" mb=".5rem">
        {title}
      </Text>
      <Text color="edf2f7" opacity=".7" fontWeight={400} fontSize=".9rem">
        {subTitle}
      </Text>
    </Box>
  );
};

export default RegisterModalHeader;
