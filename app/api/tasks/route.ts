import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { getUserId } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const userId = await getUserId();
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tasks = await Task.find({ userId });
  return Response.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();

  const userId = await getUserId();
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const task = await Task.create({
    title: body.title,
    description: body.description,
    userId,
  });

  return Response.json(task, { status: 201 });
}
