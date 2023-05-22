import getCurrentUser from "@/app/utils/getCurrentUser";
import { NextResponse } from "next/server";
import prismaService from "@/app/libs/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      {
        message: "You are not authorized, please log in!",
      },
      {
        status: 400,
      }
    );
  }

  const { id } = params;

  //To be able to delete reservation from both ways
  try {
    await prismaService.reservation.deleteMany({
      where: {
        id: id,
        OR: [{ userId: user?.id }, { listing: { userId: user?.id } }],
      },
    });
    return NextResponse.json({
      status: 200,
      data: id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while deleting reservation",
      },
      {
        status: 400,
      }
    );
  }
}
