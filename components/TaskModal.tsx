"use client";

import { useRouter } from "next/navigation";

export default function TaskModal({
  task,
  onClose,
}: {
  task: any;
  onClose: () => void;
}) {
  const router = useRouter();

  async function deleteTask() {
    await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
    });
    onClose();
    router.refresh();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 rounded-xl p-6 max-w-lg w-full border border-neutral-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-400">✕</button>
        </div>

        <h2 className="text-xl font-semibold text-white mb-3">
          {task.title}
        </h2>

        {task.description && (
          <p className="text-gray-300 whitespace-pre-wrap mb-6">
            {task.description}
          </p>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={deleteTask}
            className="text-red-400 hover:underline text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
