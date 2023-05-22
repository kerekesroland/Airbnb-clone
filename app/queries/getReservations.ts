import prismaService from "@/app/libs/prismadb";

interface IParams {
  id?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (params: IParams) => {
  try {
    const searchParams = {};

    if (params.id) {
      Object.assign(searchParams, { listingId: params.id });
    }

    if (params.userId) {
      Object.assign(searchParams, { userId: params.userId });
    }

    if (params.authorId) {
      Object.assign(searchParams, { userId: params.authorId });
    }

    const res = await prismaService.reservation.findMany({
      where: searchParams,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedReservations = res.map((el) => ({
      ...el,
      createdAt: el.createdAt.toISOString(),
      updatedAt: el.updatedAt.toISOString(),
      startDate: el.startDate.toISOString(),
      endDate: el.endDate.toISOString(),
      listing: {
        ...el.listing,
        createdAt: el.createdAt.toISOString(),
        updatedAt: el.updatedAt.toISOString(),
      },
    }));
    return formattedReservations;
  } catch (error: any) {
    throw new Error(error);
  }
};
