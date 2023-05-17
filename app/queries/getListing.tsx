import prismaService from "@/app/libs/prismadb";

export const getListing = async (id: string) => {
  try {
    const res = await prismaService.listing.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
      },
    });

    if (!res) return null;

    const formattedListing = {
      ...res,
      createdAt: res?.createdAt?.toISOString() as string,
      updatedAt: res?.updatedAt?.toISOString() as string,
      user: {
        ...res?.user,
        createdAt: res?.user?.createdAt?.toISOString() as string,
        updatedAt: res?.user?.updatedAt?.toISOString() as string,
        emailVerified: res?.user?.emailVerified?.toISOString() as string | null,
      },
    };

    return formattedListing;
  } catch (error: any) {
    throw new Error(error);
  }
};
