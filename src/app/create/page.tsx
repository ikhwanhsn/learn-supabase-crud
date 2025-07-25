"use client";

import supabase from "@/config/supabase";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const router = useRouter();
  const [task, setTask] = useState({
    name: "",
    description: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await supabase.from("tasks").upsert([task]);
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
      <>
        <div className="container mx-auto mt-8 max-w-[560px]">
          <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
            <h1 className="text-3xl font-semibold">Create Task</h1>
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
              onClick={handleCreate}
            >
              Create Task
            </button>
          </form>
        </div>
        <Head>
          <title>Create Task</title>
        </Head>
      </>
    </>
  );
}
