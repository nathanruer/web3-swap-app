import prisma from "@/prisma/prismadb";

export default async function getTokenByAddress(address: string) {
  try {
    const token = await prisma.token.findUnique({
      where: {
        address: address,
      },
    });

    return token;
  } catch (error: any) {
    throw new Error(error);
  }
}
