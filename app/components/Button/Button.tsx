"use client";
import { Button } from "@chakra-ui/react";
import styles from "./Button.module.scss";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";

interface ICustomButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  iconShow?: boolean;
  secondaryLabel?: string;
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
  iconShow,
  secondaryLabel,
}: ICustomButtonProps) => {
  const [showOnlyIcon, setShowOnlyIcon] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setShowOnlyIcon(window.innerWidth < 400);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      padding={small ? "0.25rem" : "0.75rem"}
      fontSize={small ? "14px" : "18px"}
      fontWeight={small ? "light" : "600"}
      borderWidth={small ? "1px" : "2px"}
    >
      {Icon && <Icon size={24} className={styles.button_icon} />}
      {iconShow && showOnlyIcon ? secondaryLabel : label}
    </Button>
  );
};

export default CustomButton;
