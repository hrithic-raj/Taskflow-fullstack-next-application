import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import TaskGrid from "@/components/TaskGrid";
import CreateTaskInput from "@/components/CreateTaskInput";

export const dynamic = "force-dynamic";

export default async function HomePage() {
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

  const tasks = res.ok ? await res.json() : [];

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        <CreateTaskInput />
        <TaskGrid tasks={tasks} />
      </main>
    </>
  );
}
