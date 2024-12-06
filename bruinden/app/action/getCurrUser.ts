import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/prisma/libs/prismadb";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return null;
    }
    const currUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!currUser) {
      return null;
    }
    return currUser;
  } catch (error: any) {
    return null;
  }
}
