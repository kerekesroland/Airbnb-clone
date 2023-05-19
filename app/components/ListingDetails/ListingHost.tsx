"use client";

import { IListing, IUser } from "@/app/models";
import { CATEGORIES } from "@/constants/categories";
import useLoginModal from "@/hooks/useLoginModal";
import { ICategory } from "@/inferfaces/ICategory";
import { Flex, Text } from "@chakra-ui/react";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import DatePicker from "../DatePicker/DatePicker";
import { Range } from "react-date-range";

const initDates = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface IProps {
  reservations?: Reservation[];
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
      router.refresh();
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
        setTotal(days * listing?.price);
      }
      setTotal(listing?.price);
    }
  }, [listing?.price, rangeOfDate]);

  return (
    <Flex
      height="fit-content"
      flexDirection="column"
      outline="1px solid #eee"
      padding="1rem"
      borderRadius="10px"
      width="50%"
    >
      <Flex gap="0.5rem" alignItems="center">
        <Text fontSize="20px" fontWeight={700}>
          $ {total}
        </Text>
        <Text color="#1a202c" opacity={0.6} fontWeight="600" fontSize="14px">
          night
        </Text>
      </Flex>
      <DatePicker
        range={rangeOfDate}
        onChange={changeDate}
        invalidDates={invalidDates}
      />
    </Flex>
  );
};

export default ListingHost;
