import getCurrentUser from "@/app/utils/getCurrentUser";
import { NextResponse } from "next/server";
import prismaService from "@/app/libs/prismadb";

export async function POST(
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

  const updatedUser = [...user.favourites, params.id];

  const res = await prismaService.user.update({
    where: {
      id: user?.id,
    },
    data: {
      favourites: updatedUser,
    },
  });

  return NextResponse.json(res, { status: 200 });
}

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

  const updatedUser = user?.favourites?.filter((f) => f !== params?.id);

  const res = await prismaService.user.update({
    where: {
      id: user?.id,
    },
    data: {
      favourites: updatedUser,
    },
  });

  return NextResponse.json(res, { status: 200 });
}
