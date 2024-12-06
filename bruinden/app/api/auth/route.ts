import prisma from "../../prisma/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, gender, collegeYear } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      gender,
      collegeYear,
    },
  });
  return NextResponse.json(user);
}
