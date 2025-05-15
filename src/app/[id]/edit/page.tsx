"use client";

import supabase from "@/config/supabase";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Edit = () => {
  const router = useRouter();
  const { id } = useParams();

  const [task, setTask] = useState({
    name: "",
    description: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await supabase.from("tasks").select("*").eq("id", id);
      if (data && data.length > 0) {
        setTask(data[0]);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      await supabase.from("tasks").update(task).eq("id", id);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Type check before accessing message
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Edit Task</h1>
        </div>
        <form>
          <div className="mb-4">
            <label>Title</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="name"
              value={task?.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Description</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="description"
              value={task?.description}
              onChange={onChange}
            />
          </div>
          <button
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
            type="button"
            onClick={handleUpdate}
          >
            Edit Task
          </button>
        </form>
      </div>
      <Head>
        <title>Edit Task</title>
      </Head>
    </>
  );
};

export default Edit;
