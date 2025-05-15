"use client";

import supabase from "@/config/supabase";
import Head from "next/head";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Delete = () => {
  const router = useRouter();
  const { id } = useParams();

  const [task, setTask] = useState({
    name: "",
    description: "",
  });

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

  const handleDelete = async () => {
    try {
      await supabase.from("tasks").delete().eq("id", id);
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
          <h1 className="text-3xl font-semibold">Delete Task</h1>
        </div>
        <form>
          <div className="my-12">
            Are you sure to delete <strong>{task?.name}</strong>?
          </div>
          <div className="flex w-full gap-2">
            <Link
              href="/"
              className="text-center bg-gray-300 hover:bg-opacity-80 text-black rounded-lg px-4 py-2 duration-200 w-full"
            >
              Cancel
            </Link>
            <button
              className="bg-red-500 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <Head>
        <title>Delete Task</title>
      </Head>
    </>
  );
};

export default Delete;
