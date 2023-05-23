import prismaService from "@/app/libs/prismadb";

interface IParams {
  id?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (params: IParams) => {
  try {
    const { id, userId, authorId } = params;

    const query: any = {};

    if (id) {
      query.listingId = id;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const res = await prismaService.reservation.findMany({
      where: query,
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
