import prisma from "../../lib/prisma";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        image: true,
      },
    });

    res.status(200).json({
      result: posts,
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
