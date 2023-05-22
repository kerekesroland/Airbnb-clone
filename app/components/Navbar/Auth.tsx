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
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { IUser } from "@/app/models";
import Image from "next/image";
import useRentModal, { IRentModalStore } from "@/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface IProps {
  user: IUser | null;
}

const Auth = ({ user }: IProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((value) => !value);
  }, []);
  const { onOpen }: IRegisterModalStore = useRegisterModal();
  const { onOpen: openLoginModal }: ILoginModalStore = useLoginModal();
  const { onOpen: openRentModal }: IRentModalStore = useRentModal();

  const router = useRouter();

  const handleOpenRegisterModal = () => {
    toggleUserMenu();
    onOpen();
  };

  const handleOpenLoginModal = () => {
    toggleUserMenu();
    openLoginModal();
  };

  const handleOpenRent = useCallback(() => {
    if (!user) {
      return openLoginModal();
    }

    openRentModal();
  }, [user, openLoginModal, openRentModal]);

  const handleLogout = async () => {
    try {
      await signOut();
      setTimeout(() => {
        toast.success("Successfully logged out!");
      }, 200);
    } catch (error) {
      toast.error("Error while logging out");
    }
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
          onClick={handleOpenRent}
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
            {user && user.image ? (
              <Flex width="32px" height="32px" borderRadius="50%">
                <Image
                  src={user.image}
                  alt="profile image"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  quality={100}
                  width={32}
                  height={32}
                />
              </Flex>
            ) : (
              <ProfileIcon />
            )}
          </Flex>
          {isUserMenuOpen ? (
            <Flex
              zIndex={2}
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
              {user ? (
                <>
                  <MenuItem
                    label="My trips"
                    onClick={() => router.push("/trips")}
                  />
                  <MenuItem label="My reservations" onClick={() => {}} />
                  <MenuItem label="My favorites" onClick={() => {}} />
                  <MenuItem label="My properties" onClick={() => {}} />
                  <MenuItem label="Airbnb my home" onClick={openRentModal} />
                  <MenuItem label="Logout" onClick={handleLogout} />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={handleOpenLoginModal} />
                  <MenuItem label="Sign up" onClick={handleOpenRegisterModal} />
                </>
              )}
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default Auth;
