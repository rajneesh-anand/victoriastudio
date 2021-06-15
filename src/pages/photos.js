import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Photos() {
  const [postDetail, setPostDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  // "https://nodappserver.herokuapp.com/api/upload"

  useEffect(async () => {
    const res = await fetch("https://nodappserver.herokuapp.com/api/upload");
    const data = await res.json();
    if (data.msg === "success") {
      setLoading(false);
      setPostDetail(data.result);
    }
  }, []);

  // const res = await fetch("https://nodappserver.herokuapp.com/api/upload");
  // const data = await res.json();
  // const posts = data.result;
  return loading ? (
    <div className="text-center">
      <h4>Loading.....</h4>
    </div>
  ) : (
    <>
      <div style={{ display: "flex" }}>
        {postDetail.map((post) => (
          <div key={post.id} style={{ margin: 10 }}>
            <Image src={post.image} alt={post.title} width={250} height={300} />
          </div>
        ))}
      </div>
    </>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch("https://nodappserver.herokuapp.com/api/upload");
//   const result = await res.json();

//   return { props: { data: result } };
// }
