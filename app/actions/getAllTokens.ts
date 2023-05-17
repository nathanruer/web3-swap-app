import prisma from "@/prisma/prismadb";

export default async function getAllTokens() {
  try {
    const tokens = await prisma.token.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    return tokens;
  } catch (error: any) {
    throw new Error(error);
  }
}
