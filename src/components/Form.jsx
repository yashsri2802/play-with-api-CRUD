import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/PostAPI";

export const Form = ({ data, setData, updateData, setUpdateData }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateData).length === 0;

  //get updated data and add to input field
  useEffect(() => {
    updateData &&
      setAddData({
        title: updateData.title || "",
        body: updateData.body || "",
      });
  }, [updateData]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updatePostData = async (e) => {
    try {
      const res = await updatePost(updateData.id, addData);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });
        setAddData({ title: "", body: "" });
        setUpdateData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPostData = async () => {
    const res = await createPost(addData);
    // console.log(res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value; // get submit button value
    if (action === "Add") {
      addPostData();
    } else if (action === "Update") {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Update"}>
        {isEmpty ? "Add" : "Update"}
      </button>
    </form>
  );
};
