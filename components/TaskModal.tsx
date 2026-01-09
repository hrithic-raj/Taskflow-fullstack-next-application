"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskModal({
  task,
  onClose,
}: {
  task: any;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);

  async function saveTask() {
    if (
      title === task.title &&
      description === task.description
    ) {
      onClose();
      return;
    }

    await fetch(`/api/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    onClose();
    router.refresh();
  }

  async function deleteTask() {
    await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
    });
    onClose();
    router.refresh();
  }

  // Close on outside click → auto-save
  function handleBackdropClick() {
    saveTask();
  }

  // Esc key → auto-save
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        saveTask();
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [title, description]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-900 rounded-xl p-6 max-w-lg w-full border border-neutral-700 shadow-lg transition-all"
      >
        {/* Header */}
        <div className="flex justify-end">
          <button
            onClick={saveTask}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Editable Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full bg-transparent text-white text-xl font-semibold outline-none mb-3"
        />

        {/* Editable Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Take a note..."
          className="w-full bg-transparent text-gray-300 outline-none resize-none whitespace-pre-wrap"
          rows={5}
        />

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={deleteTask}
            className="text-red-400 hover:underline text-sm"
          >
            Delete
          </button>

          <button
            onClick={saveTask}
            className="text-blue-400 hover:underline text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
