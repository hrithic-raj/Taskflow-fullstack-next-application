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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  // 🔥 Auto-grow textarea
  function autoResize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }

  useEffect(() => {
    autoResize();
  }, [description]);

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

  // Esc → save & close
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") saveTask();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [title, description]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={saveTask}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-neutral-900
          rounded-xl
          border border-neutral-700
          shadow-xl
          w-full
          max-w-2xl
          max-h-[75vh]
          flex
          flex-col
        "
      >
        {/* Header (fixed) */}
        <div className="flex justify-end px-4 py-3">
          <button
            onClick={saveTask}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* SCROLL CONTAINER */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent text-white text-xl font-semibold outline-none mb-4"
          />

          {/* Description (NO SCROLLBAR HERE) */}
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onInput={autoResize}
            placeholder="Take a note..."
            className="
              w-full
              bg-transparent
              text-gray-300
              outline-none
              resize-none
              overflow-hidden
              whitespace-pre-wrap
            "
          />
        </div>

        {/* Footer (fixed) */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-neutral-800">
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
