import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Content() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/${id}`);
        const data = await res.data;
        setBlog(data);
        setInput({
          title: data.title,
          description: data.description,
          image: data.image,
        });
      } catch (error) {
        console.log(error);
        throw new Error("Cannot fetch this blog");
      }
    };
    fetchDetail();
  }, [id]);

  if (!blog) {
    return <div>....Loading</div>;
  }

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
      >
        {input.title}
      </h1>
      <img
        style={{
          width: "500px",
          maxHeight: "400px",
          objectFit: "cover",
          marginBottom: "20px",
        }}
        src={input.image}
        alt={input.title}
      />
      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.6",
          width: "700px",
          whiteSpace: "pre-wrap",
        }}
      >
        {input.description}
      </p>
    </div>
  );
}