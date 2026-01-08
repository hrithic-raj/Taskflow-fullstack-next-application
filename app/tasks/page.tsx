import Link from "next/link";
import DeleteTaskButton from "./DeleteTaskButton";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

type Task = {
  _id: string;
  title: string;
  description?: string;
};

export default async function TasksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return <p className="p-6 text-red-400">Unauthorized</p>;
  }

  const res = await fetch("http://localhost:3000/api/tasks", {
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="p-6 text-red-400">Failed to load tasks</p>;
  }

  const tasks: Task[] = await res.json();

  if (tasks.length === 0) {
    return (
      <p className="p-6 text-gray-400">
        No tasks found. Create your first task 🚀
      </p>
    );
  }

  return (
    <main className="p-6">
      {/* Masonry layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="mb-4 break-inside-avoid rounded-xl border border-gray-700 bg-neutral-900 p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2">
              {task.title}
            </h3>

            {/* Description */}
            {task.description && (
              <p className="text-sm text-gray-300 whitespace-pre-wrap">
                {task.description}
              </p>
            )}

            {/* Actions */}
            <div className="mt-4 flex items-center gap-3 opacity-0 hover:opacity-100 transition">
              <Link
                href={`/tasks/${task._id}`}
                className="text-sm text-blue-400 hover:underline"
              >
                View
              </Link>

              <DeleteTaskButton taskId={task._id} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
