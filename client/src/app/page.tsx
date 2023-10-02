"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [names, setNames] = useState<{ _id: string; name: string }[]>([]);
  const [name, setName] = useState("");

  const handleSave = async () => {
    try {
      const rawResponse = await fetch("http://localhost:3000/topic", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const content = await rawResponse.json();
      getTopics();
      setName("");

      console.log(content);
    } catch (error) {
      console.log({ error });
    }
  };

  const getTopics = () => {
    fetch("http://localhost:3000/topics")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNames(data.topics);
      })
      .catch((err) => console.log({ err }));
  };

  const handleDelete = async (id: string) => {
    try {
      const rawResponse = await fetch(`http://localhost:3000/topic/${id}`, {
        method: "DELETE",
      });
      const content = await rawResponse.json();

      console.log(content);
      getTopics();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <div className="relative mb-6" data-te-input-wrapper-init>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          />
          <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
            Enter text here
          </label>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-color="light"
        >
          Submit
        </button>

        <div className="relative mb-6" data-te-input-wrapper-init>
          <ul>
            {names.length > 0 &&
              names.map((n) => {
                return (
                  <React.Fragment key={n._id}>
                    <li onClick={() => handleDelete(n._id)}>{n.name}</li>
                  </React.Fragment>
                );
              })}
          </ul>
        </div>
      </form>
    </main>
  );
}
