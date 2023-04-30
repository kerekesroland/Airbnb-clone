"use client";

import styles from "./Navbar.module.scss";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ProfileIcon } from "../Icons/Icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiWorld } from "react-icons/tfi";
import MenuItem from "./MenuItem";
import { useCallback, useEffect, useRef, useState } from "react";
import useRegisterModal, {
  IRegisterModalStore,
} from "@/hooks/useRegisterModal";
import useLoginModal, { ILoginModalStore } from "@/hooks/useLoginModal";

const Auth = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((value) => !value);
  }, []);
  const { onOpen }: IRegisterModalStore = useRegisterModal();
  const { onOpen: openLoginModal }: ILoginModalStore = useLoginModal();

  const handleOpenRegisterModal = () => {
    toggleUserMenu();
    onOpen();
  };

  const handleOpenLoginModal = () => {
    toggleUserMenu();
    openLoginModal();
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsUserMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <Flex alignItems="center" justifyContent="flex-start" gap=".3rem">
        <Box
          cursor="pointer"
          p="12px"
          borderRadius="22px"
          _hover={{ backgroundColor: "#f7f7f7" }}
          className={styles.auth__container}
        >
          <Text fontSize="14px" fontWeight="700" color="#222">
            Airbnb your home
          </Text>
        </Box>
        <Box
          cursor="pointer"
          p="12px"
          borderRadius="22px"
          _hover={{ backgroundColor: "#f7f7f7" }}
          className={styles.auth__container}
        >
          <TfiWorld cursor="pointer" />
        </Box>

        <Flex
          ref={dropdownRef}
          onClick={toggleUserMenu}
          transition="all 0.5s ease"
          position="relative"
          justifyContent="flex-start"
        >
          <Flex
            gap="1rem"
            padding="5px 5px 5px 12px"
            justifyContent="center"
            alignItems="center"
            background="transparent"
            cursor="pointer"
            margin="0"
            textAlign="inherit"
            border="1px solid #e0e0e0"
            borderRadius="21px"
            transition="boxShadow 0.2s ease"
            _hover={{ boxShadow: "0px 5px 5px 0px rgb(224,224,224)" }}
          >
            <RxHamburgerMenu cursor="pointer" />
            <ProfileIcon />
          </Flex>
          {isUserMenuOpen ? (
            <Flex
              overflow="hidden"
              borderRadius="10px"
              border="1px solid #e0e0e0"
              backgroundColor="#fff"
              position="absolute"
              top="3rem"
              right="0px"
              boxShadow="0px 5px 5px 0px rgb(224,224,224)"
              flexDirection="column"
              textAlign="left"
              w="170px"
            >
              <MenuItem label="Login" onClick={handleOpenLoginModal} />
              <MenuItem label="Sign up" onClick={handleOpenRegisterModal} />
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default Auth;
