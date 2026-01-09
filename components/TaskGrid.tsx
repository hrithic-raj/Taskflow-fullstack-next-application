"use client";

import { useState } from "react";
import TaskModal from "./TaskModal";

type Task = {
  _id: string;
  title: string;
  description?: string;
};

export default function TaskGrid({ tasks }: { tasks: Task[] }) {
  const [selected, setSelected] = useState<Task | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            onClick={() => setSelected(task)}
            className="mb-4 break-inside-avoid rounded-xl border border-neutral-700 bg-neutral-900 p-4 cursor-pointer hover:shadow-md transition"
          >
            <h3 className="text-white font-semibold mb-2">
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-300 text-sm whitespace-pre-wrap">
                {task.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <TaskModal task={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
