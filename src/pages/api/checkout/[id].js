import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  try {
    const id = req.query.id;

    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}
