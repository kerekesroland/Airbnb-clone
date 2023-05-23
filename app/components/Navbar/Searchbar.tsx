"use client";
import useFilterModal from "@/hooks/useFilterModal";
import styles from "./Navbar.module.scss";
import { Box, Button, Flex } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

const SearchBar = () => {
  const { onOpen, onClose } = useFilterModal();
  const params = useSearchParams();
  const { getCountryByName } = useCountries();

  const location = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guests = params?.get("numberOfGuests");

  const locationTitle = useMemo(() => {
    if (location) {
      return getCountryByName(location?.split(",")[1].trim())?.label;
    }
    return "AnyWhere";
  }, [location, getCountryByName]);

  const dateTitle = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let days = differenceInDays(end, start);

      if (days === 0) {
        days = 1;
      }
      return `${days} Days`;
    }
    return "Any week";
  }, [endDate, startDate]);

  const guestsTitle = useMemo(() => {
    if (guests) {
      return `${guests} Guests`;
    }
    return "Add guests";
  }, [guests]);

  return (
    <Flex
      padding="6px"
      borderRadius="40px"
      boxShadow="0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)"
      transition="box-shadow 0.2s ease"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      _hover={{ boxShadow: "0px 5px 5px 0px rgb(224,224,224)" }}
      className={styles.search_bar__container}
    >
      <Flex className={styles.search__bar} onClick={onOpen}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="6px 24px"
        >
          <Button fontSize="14px" fontWeight="700">
            {locationTitle}
          </Button>
        </Box>
        <Box className={styles.search_param}>
          <Button fontSize="14px" fontWeight="700">
            {dateTitle}
          </Button>
        </Box>
        <Box className={styles.search_param}>
          <Button fontSize="14px" fontWeight="500" color="#717171">
            {guestsTitle}
          </Button>
        </Box>
      </Flex>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        padding="10px"
        backgroundColor="#f9385d"
      >
        <FaSearch cursor="pointer" color="#fff" />
      </Box>
    </Flex>
  );
};

export default SearchBar;
