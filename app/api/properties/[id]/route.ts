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
        message: "You are not logged in!",
      },
      {
        status: 400,
      }
    );
  }

  const deletedID = await prismaService.listing.deleteMany({
    where: {
      id: params.id,
      userId: user.id,
    },
  });

  return NextResponse.json(deletedID);
}
