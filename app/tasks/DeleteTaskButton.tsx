"use client";

import { useRouter } from "next/navigation";

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  const router = useRouter();

  async function deleteTask() {
    const confirmed = confirm("Delete this task?");
    if (!confirmed) return;

    const res = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete task");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={deleteTask}
      className="text-sm text-red-400 hover:underline"
    >
      Delete
    </button>
  );
}
