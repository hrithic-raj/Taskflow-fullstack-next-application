import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { getUserId } from "@/lib/auth";

export async function GET(req: Request) {
  await connectDB();
  const userId = getUserId(req);
  const tasks = await Task.find({ userId });
  return Response.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();
  const userId = getUserId(req);
  const body = await req.json();
  const task = await Task.create({ ...body, userId });
  return Response.json(task);
}
