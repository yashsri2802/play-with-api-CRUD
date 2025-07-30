import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostAPI";
import "../App.css";
import { Form } from "./Form";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState({});

  const getPostData = async () => {
    const res = await getPost();
    // console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  //function to delete data
  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const updatedPosts = data.filter((curPost) => curPost.id !== id);
        setData(updatedPosts);
      } else {
        console.log("Error deleting post", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function to update post
  const handleUpdate = (curElem) => setUpdateData(curElem);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateData={updateData}
          setUpdateData={setUpdateData}
        />
      </section>
      <section className="section-post">
        <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => handleUpdate(curElem)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
      ;
    </>
  );
};
