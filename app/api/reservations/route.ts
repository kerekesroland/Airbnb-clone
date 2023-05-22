import getCurrentUser from "@/app/utils/getCurrentUser";
import { NextResponse } from "next/server";
import prismaService from "@/app/libs/prismadb";

export async function POST(req: Request, res: Response) {
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

  const { total, startDate, endDate, listingId } = await req.json();

  if (!total || !startDate || !endDate || !listingId) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }

  const data = await prismaService.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservation: {
        create: {
          userId: user.id,
          startDate,
          endDate,
          totalPrice: total,
        },
      },
    },
  });

  return NextResponse.json({ status: 200, data });
}
