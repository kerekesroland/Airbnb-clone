"use client";

import { IUser } from "@/app/models";
import useCountries from "@/hooks/useCountries";
import { Flex } from "@chakra-ui/react";
import React from "react";
import GeneralHeader from "../GeneralHeader/GeneralHeader";
import Image from "next/image";

interface IProps {
  title: string;
  location: Array<string>;
  image: string;
  id: string;
  user?: IUser | null;
}

const ListingHeader = ({ title, location, image, id, user }: IProps) => {
  const { getCountry } = useCountries();
  const coordinates = getCountry(location);

  return (
    <Flex width="100%" flexDirection="column" mb="4rem">
      <GeneralHeader
        title={title}
        subTitle={`${coordinates?.label} , ${coordinates?.region}`}
      />
      <Flex
        mx="auto"
        mt="1rem"
        height="60vh"
        overflow="hidden"
        width="100%"
        position="relative"
        borderRadius="10px"
        maxW="1000px"
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          quality={100}
        />
      </Flex>
    </Flex>
  );
};

export default ListingHeader;
