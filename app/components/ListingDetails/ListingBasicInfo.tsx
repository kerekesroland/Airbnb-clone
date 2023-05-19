"use client";

import { IUser } from "@/app/models";
import useCountries from "@/hooks/useCountries";
import { ICategory } from "@/inferfaces/ICategory";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import Location from "../Location/Location";

interface IProps {
  user: IUser;
  category: ICategory;
  description: string;
  rooms: number;
  bathrooms: number;
  guests: number;
  location: Array<string>;
}

interface IInfoProps {
  user: IUser;
  category: ICategory;
  description: string;
  rooms: number;
  bathrooms: number;
  guests: number;
  location: Array<string>;
}

interface ICategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingBasicInfo = ({
  user,
  category,
  description,
  bathrooms,
  rooms,
  guests,
  location,
}: IProps) => {
  const { getCountry } = useCountries();
  const coordinates = getCountry(location);

  return (
    <Flex width="50%" flexDirection="column">
      <ListingInfo
        user={user}
        rooms={rooms}
        bathrooms={bathrooms}
        guests={guests}
        category={category}
        location={location}
        description={description}
      />
      <hr color="#B3B3B3" style={{ opacity: "0.5" }} />
      <Category
        icon={category?.image}
        label={category?.label}
        description={category?.desc}
      />
      <hr color="#B3B3B3" style={{ opacity: "0.5" }} />

      <Description />

      <hr color="#B3B3B3" style={{ opacity: "0.5" }} />

      <Location mapHeight={500} center={location.map((el) => Number(el))} />
    </Flex>
  );
};

export default ListingBasicInfo;

const ListingInfo = ({ user, rooms, guests, bathrooms }: IInfoProps) => {
  return (
    <Flex flexDirection="column" mb="2rem">
      <Flex alignItems="center" gap="0.5rem">
        <Text fontWeight="700">Hosted by {user?.name}</Text>
        <Avatar w={8} h={8} src={user?.image as string}></Avatar>
      </Flex>
      <Flex mt="0.5rem" alignItems="center" gap="1rem">
        {[
          { label: "guests", value: guests },
          { label: "rooms", value: rooms },
          { label: "bathrooms", value: bathrooms },
        ].map((el) => (
          <Text
            color="#1a202c"
            opacity={0.6}
            fontWeight="600"
            fontSize="14px"
            key={el.value}
          >
            {el.value} {el.label}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

const Category = ({ icon: Icon, label, description }: ICategoryProps) => {
  return (
    <Flex my="2rem" alignItems="center" gap="1rem">
      <Icon size={24} />
      <Flex flexDirection="column">
        <Text fontWeight="700">{label}</Text>
        <Text color="#1a202c" opacity={0.6} fontWeight="600" fontSize="14px">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

const Description = () => {
  return (
    <Flex my="2rem">
      <Text color="#1a202c" opacity={0.6} fontWeight="600" fontSize="14px">
        Description for the property
      </Text>
    </Flex>
  );
};
