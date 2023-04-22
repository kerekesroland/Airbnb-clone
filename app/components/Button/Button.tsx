"use client";
import { Button } from "@chakra-ui/react";
import styles from "./Button.module.scss";
import { IconType } from "react-icons";

interface ICustomButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const CustomButton = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ICustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      w="100%"
      position="relative"
      opacity={disabled ? 0.4 : 1}
      cursor={disabled ? "not-allowed" : "pointer"}
      borderRadius="5px"
      _hover={{
        opacity: "0.8",
      }}
      backgroundColor={outline ? "#fff" : "#f8385d"}
      border={outline ? "1px solid #000" : "1px solid #f8385d"}
      color={outline ? "#000" : "#fff"}
      padding={small ? "0.25rem" : ".75rem"}
      fontSize={small ? "14px" : "18px"}
      fontWeight={small ? "light" : "semibold"}
      borderWidth={small ? "1px" : "2px"}
    >
      {Icon && <Icon size={24} className={styles.button_icon} />}
      {label}
    </Button>
  );
};

export default CustomButton;
