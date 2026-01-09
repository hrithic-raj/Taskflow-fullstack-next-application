import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ REQUIRED

  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded: any;
  try {
    decoded = verifyToken(token);
  } catch {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  const task = await Task.findById(id);

  if (!task) {
    return Response.json({ message: "Task not found" }, { status: 404 });
  }

  if (task.userId.toString() !== decoded.id) {
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  await Task.findByIdAndDelete(id);

  return Response.json({ message: "Task deleted" });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ REQUIRED

  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded: any;
  try {
    decoded = verifyToken(token);
  } catch {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  const task = await Task.findOne({
    _id: id,
    userId: decoded.id,
  });

  if (!task) {
    return Response.json({ message: "Task not found" }, { status: 404 });
  }

  return Response.json(task);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  let decoded: any;
  try {
    decoded = verifyToken(token);
  } catch {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  const body = await req.json();

  const task = await Task.findOne({
    _id: id,
    userId: decoded.id,
  });

  if (!task) {
    return Response.json({ message: "Task not found" }, { status: 404 });
  }

  task.title = body.title ?? task.title;
  task.description = body.description ?? task.description;

  await task.save();

  return Response.json(task);
}
