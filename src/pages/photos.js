import prisma from "../lib/prisma";
import Image from "next/image";

export default function Photos({ data }) {
  let posts = JSON.parse(data);

  return (
    <>
      <div style={{ display: "flex" }}>
        {posts.map((post) => (
          <div key={post.id} style={{ margin: 10 }}>
            <Image src={post.image} alt={post.title} width={250} height={300} />
          </div>
        ))}
      </div>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      image: true,
    },
  });

  // Fetch data from external API
  //   const res = await fetch(`https://.../data`);
  //   const data = await res.json();

  // Pass data to the page via props
  return { props: { data: JSON.stringify(posts) } };
}
