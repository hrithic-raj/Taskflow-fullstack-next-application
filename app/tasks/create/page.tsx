"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function submit() {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to create task");
      return;
    }

    // ✅ Go back to task list
    router.push("/tasks");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "500px" }}>
      <h1>Create Task</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
          rows={4}
        />
      </div>

      <button
        onClick={submit}
        disabled={loading}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </main>
  );
}
