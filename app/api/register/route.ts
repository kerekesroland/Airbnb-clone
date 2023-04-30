import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { email, password, name } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const userToCreate = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json(userToCreate);
}
