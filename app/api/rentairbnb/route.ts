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

  const {
    propertyType,
    propertyDetails,
    propertyImage,
    country,
    propertyTitle,
    propertyDescription,
    propertyPrice,
    coordinates,
  } = await req.json();

  const airbnb = await prismaService.listing.create({
    data: {
      title: propertyTitle,
      category: propertyType,
      description: propertyDescription,
      image: propertyImage,
      price: parseInt(propertyPrice, 10),
      numberOfBathrooms: propertyDetails.bathrooms,
      numberOfGuests: propertyDetails.guests,
      numberOfRooms: propertyDetails.rooms,
      userId: user.id,
      locationValue: country,
      coordinates: coordinates,
    },
  });

  return NextResponse.json({
    data: airbnb,
    status: 200,
  });
}
