import prismaService from "@/app/libs/prismadb";
import { Listing } from "@prisma/client";

export interface IListingProps {
  userId?: string;
  numberOfGuests?: number;
  numberOfBathrooms?: number;
  numberOfRooms?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export const getAllListings = async ({
  userId,
  numberOfBathrooms,
  numberOfGuests,
  numberOfRooms,
  startDate,
  endDate,
  category,
  locationValue,
}: IListingProps) => {
  try {
    let searchParams: any = {};

    if (userId) {
      searchParams.userId = userId;
    }

    if (category) {
      searchParams.category = category;
    }

    if (locationValue) {
      searchParams.locationValue = locationValue;
    }

    if (numberOfBathrooms) {
      searchParams.numberOfBathrooms = {
        gte: +numberOfBathrooms,
      };
    }
    if (numberOfGuests) {
      searchParams.numberOfGuests = {
        gte: +numberOfGuests,
      };
    }
    if (numberOfRooms) {
      searchParams.numberOfRooms = {
        gte: +numberOfRooms,
      };
    }

    if (startDate && endDate) {
      searchParams.NOT = {
        reservation: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const res = await prismaService.listing.findMany({
      where: searchParams,
      orderBy: {
        createdAt: "desc",
      },
    });

    const newRes = res?.map((el: Listing) => {
      return {
        ...el,
        createdAt: el?.createdAt?.toISOString() as string,
        updatedAt: el?.updatedAt?.toISOString() as string,
      };
    });

    return newRes;
  } catch (error: any) {
    throw new Error(error);
  }
};
