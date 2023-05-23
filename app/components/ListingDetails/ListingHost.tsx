"use client";

import { IListing, IReservation, IUser } from "@/app/models";
import { CATEGORIES } from "@/constants/categories";
import useLoginModal from "@/hooks/useLoginModal";
import { ICategory } from "@/inferfaces/ICategory";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import DatePicker from "../DatePicker/DatePicker";
import { Range } from "react-date-range";
import styles from "./ListingHost.module.scss";
import CustomButton from "../Button/Button";

const initDates = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface IProps {
  reservations?: IReservation[];
  listing: IListing & {
    user: IUser;
  };
  user: IUser | null;
}

const ListingHost = ({ user, listing, reservations = [] }: IProps) => {
  const { onOpen } = useLoginModal();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(listing?.price);
  const [rangeOfDate, setRangeOfDate] = useState<Range>(initDates);

  const category = CATEGORIES.find(
    (cat) => cat.label === listing?.category
  ) as ICategory;

  const invalidDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const makeReservation = useCallback(async () => {
    if (!user) {
      onOpen();
    }
    setLoading(true);

    try {
      await axios.post("/api/reservations", {
        total,
        startDate: rangeOfDate.startDate,
        endDate: rangeOfDate.endDate,
        listingId: listing?.id,
      });
      toast.success("Successfully made a reservation!");
      setRangeOfDate(initDates);
      router.push("/trips");
    } catch (error) {
      toast.error("Error while making a reservation!");
    } finally {
      setLoading(false);
    }
  }, [
    user,
    onOpen,
    total,
    rangeOfDate.startDate,
    rangeOfDate.endDate,
    listing?.id,
    router,
  ]);

  const changeDate = (value: any) => setRangeOfDate(value.selection);

  useEffect(() => {
    if (rangeOfDate.startDate && rangeOfDate.endDate) {
      const days = differenceInCalendarDays(
        rangeOfDate.startDate,
        rangeOfDate.endDate
      );
      if (days && listing?.price) {
        setTotal(Math.abs(days * listing?.price));
      } else {
        setTotal(listing?.price);
      }
    }
  }, [listing?.price, rangeOfDate]);

  return (
    <Flex className={styles.dateSelect}>
      <Flex mb="16px" gap="0.5rem" alignItems="center">
        <Text fontSize="20px" fontWeight={700}>
          $ {listing?.price}
        </Text>
        <Text color="#1a202c" opacity={0.6} fontWeight="600" fontSize="14px">
          night
        </Text>
      </Flex>
      <hr color="#B3B3B3" style={{ opacity: "0.5" }} />
      <DatePicker
        range={rangeOfDate}
        onChange={changeDate}
        invalidDates={invalidDates}
      />
      <hr color="#B3B3B3" style={{ opacity: "0.5" }} />
      <Flex mt="16px" flexDirection="column">
        <Flex mb="16px" alignItems="center" justifyContent="space-between">
          <Text fontSize="20px" fontWeight={700}>
            Total
          </Text>
          <Text fontSize="20px" fontWeight={700}>
            $ {total}
          </Text>
        </Flex>

        <CustomButton
          label="Make Reservation"
          onClick={makeReservation}
          disabled={loading}
        />
      </Flex>
    </Flex>
  );
};

export default ListingHost;
