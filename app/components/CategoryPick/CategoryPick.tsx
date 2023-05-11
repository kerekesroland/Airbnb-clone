import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import styles from "./CategoryPick.module.scss";
import { motion } from "framer-motion";
import { IRentInputProps } from "@/inferfaces/IRentInputProps";

type Props = {
  label: string;
  desc: string;
  image: IconType;
  active: string;
  onChange: (id: keyof IRentInputProps, value: any) => void;

  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryPick = ({
  label,
  desc,
  image: Icon,
  active,
  setActive,
  onChange,
}: Props) => {
  const classes = (label: string) => {
    return label === active
      ? styles.categoryPick.concat(" ").concat(styles.active)
      : styles.categoryPick;
  };
  const handleActivePick = (label: string) => {
    setActive(label);
  };
  return (
    <Flex
      onClick={() => {
        handleActivePick(label);
        onChange("propertyType", label);
      }}
      className={classes(label)}
    >
      <Icon size={28} />
      <Text>{label}</Text>
    </Flex>
  );
};

export default CategoryPick;
