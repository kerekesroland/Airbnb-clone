import { IListing } from "@/inferfaces/IListing";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import { HeartIcon } from "../Icons/Icons";
import { AiFillStar } from "react-icons/ai";
import { IUser } from "@/app/models";
import { Reservation } from "@prisma/client";
import useCountries from "@/hooks/useCountries";
import styles from "./Listing.module.scss";
import CustomButton from "../Button/Button";

interface IProps {
  listing: IListing;
  reservation: Reservation;
  disabled: boolean;
  user: IUser | null;
  onAction?: (id: string) => void;
  actionId?: string;
  actionLabel?: string;
}

const Listing = ({
  listing,
  disabled,
  user,
  onAction,
  actionId,
  actionLabel,
  reservation,
}: IProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // const { getCountry } = useCountries();

  // const location = getCountry(listing?.locationValue);

  // console.log(location);

  const handleSetFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId as string);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return listing?.price;
  }, [reservation, listing]);

  return (
    <Flex flexDirection="column" height="357px" w="281px">
      <Flex
        className={styles.image_container}
        position="relative"
        minH="261px"
        w="100%"
      >
        <Image
          className={styles.image}
          src={listing?.image}
          quality={100}
          fill
          style={{
            objectFit: "cover",
            borderRadius: "12px",
          }}
          alt={listing?.title}
        />
        <Box
          onClick={handleSetFavorite}
          transition="color 0.5s ease-out"
          cursor="pointer"
          zIndex="1"
          backgroundColor="transparent"
          position="absolute"
          top="1rem"
          right="1rem"
        >
          <HeartIcon currentColor={isFavorite ? "tomato" : ""} />
        </Box>
      </Flex>
      <Flex mt="10px" alignItems="center" justifyContent="space-between">
        <Text fontWeight="700" fontSize="16px" lineHeight="1.3" maxWidth="100%">
          {listing?.locationValue}
        </Text>
        <Flex alignItems="center" gap="5px">
          <AiFillStar />
          <Text maxWidth="100%">0.00</Text>
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Text
          mt="3px"
          fontSize="15px"
          lineHeight="1.3"
          fontWeight="400"
          color="#767676"
          maxWidth="100%"
        >
          {listing?.title} - {listing?.description}
        </Text>
        <Text
          mt="3px"
          fontSize="15px"
          lineHeight="1.3"
          fontWeight="400"
          color="#767676"
          maxWidth="100%"
        >
          May 31 - Jun 6
        </Text>
        <Flex alignItems="center" gap="1">
          <Text
            fontSize="15px"
            lineHeight="1.3"
            fontWeight="700"
            color="#222"
            mt="12px"
            maxWidth="100%"
          >
            ${listing?.price}
          </Text>
          {!reservation && (
            <Text
              mt="12px"
              fontSize="15px"
              lineHeight="1.3"
              fontWeight="400"
              color="#767676"
            >
              night
            </Text>
          )}

          {onAction && actionLabel && (
            <CustomButton
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Listing;
