import prismaService from "@/app/libs/prismadb";
import getCurrentUser from "../utils/getCurrentUser";

export const getAllFavorites = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized!");
    }

    const favorites = await prismaService.listing.findMany({
      where: {
        id: {
          in: [...(user.favourites || [])],
        },
      },
    });

    const formattedFavorites = favorites.map((f) => {
      return {
        ...f,
        createdAt: f.createdAt?.toISOString() as string,
        updatedAt: f.updatedAt?.toISOString() as string,
      };
    });

    return formattedFavorites;
  } catch (error) {
    throw new Error("Error while fetching favorites");
  }
};
