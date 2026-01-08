"use client";
import { useState } from "react";

export default function CreateTask() {
  const [title, setTitle] = useState("");

  async function submit() {
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title }),
    });
  }

  return (
    <>
      <input placeholder="Task title" onChange={e => setTitle(e.target.value)} />
      <button onClick={submit}>Create</button>
    </>
  );
}
