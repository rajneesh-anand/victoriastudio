import prisma from "../lib/prisma";
import Image from "next/image";

export default function Photos({ data }) {
  let posts = JSON.parse(data);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <Image src={post.image} alt={post.title} width={400} height={450} />
        </div>
      ))}
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const posts = await prisma.post.findMany();
  // Fetch data from external API
  //   const res = await fetch(`https://.../data`);
  //   const data = await res.json();

  // Pass data to the page via props
  return { props: { data: JSON.stringify(posts) } };
}