"use client";
import { IErrorMessage } from "@/inferfaces/IInputController";
import { Text } from "@chakra-ui/react";
import styles from "./ErrorMessage.module.scss";

export function ErrorMessage({
  isTouched = true,
  error,
  textAlign = "center",
}: IErrorMessage) {
  return (
    <>
      {isTouched && error && (
        <Text
          width="100%"
          textAlign={textAlign}
          color="#de1361"
          fontSize="0.9rem"
          marginTop="1rem"
          fontWeight="450"
        >
          {error}
        </Text>
      )}
    </>
  );
}
