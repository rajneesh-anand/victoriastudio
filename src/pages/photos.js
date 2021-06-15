import Image from "next/image";

export default function Photos({ data }) {
  const posts = data.result;
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

export async function getServerSideProps() {
  const res = await fetch("https://victoria-five.vercel.app/api/post");
  const result = await res.json();

  return { props: { data: result } };
}
