"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import { HiPlus, HiMinus } from "react-icons/hi";

interface IProps {
  title: string;
  subTitle: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const IncrementController = ({
  title,
  subTitle,
  value,
  onIncrement,
  onDecrement,
}: IProps) => {
  return (
    <Flex justifyContent="space-between">
      <Flex flexDirection="column">
        <Text fontSize=".9rem" fontWeight="700">
          {title}
        </Text>
        <Text fontSize=".8rem" color="gray" fontWeight="500">
          {subTitle}
        </Text>
      </Flex>

      <Flex alignItems="center" gap="0.5rem">
        <Button
          onClick={onDecrement}
          padding=".5rem"
          backgroundColor="#fff"
          border="1px solid #eee"
          borderRadius="50%"
        >
          <HiMinus />
        </Button>
        <Text minW="30px" textAlign="center">
          {value}
        </Text>
        <Button
          onClick={onIncrement}
          padding=".5rem"
          backgroundColor="#fff"
          border="1px solid #eee"
          borderRadius="50%"
        >
          <HiPlus />
        </Button>
      </Flex>
    </Flex>
  );
};

export default IncrementController;
