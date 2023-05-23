import { getServerSession } from "next-auth/next";
import prisma from "@/app/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextAuth]";

const getSession = async () => {
  return await getServerSession(authOptions);
};

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) return null;

    return {
      ...user,
      createdAt: user.createdAt?.toISOString() as string,
      updatedAt: user.updatedAt?.toISOString() as string,
      emailVerified: user.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
