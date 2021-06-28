import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const movie = await prisma.movie.findMany({
      where: {
        status: true,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    console.log(movie);
    res.status(200).json({
      msg: "success",
      data: movie,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
