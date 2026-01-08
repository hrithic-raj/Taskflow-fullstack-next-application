import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

type Task = {
  _id: string;
  title: string;
  description?: string;
};

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  const res = await fetch(
    `http://localhost:3000/api/tasks/${id}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    }
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Failed to load task");
  }

  const task: Task = await res.json();

  return (
    <main style={{ padding: "2rem" }}>
      <h2>{task.title}</h2>
      {task.description && <p>{task.description}</p>}
    </main>
  );
}
