import prismaService from "@/app/libs/prismadb";
import { Listing } from "@prisma/client";

export const getAllListings = async () => {
  try {
    const res = await prismaService.listing.findMany({
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
