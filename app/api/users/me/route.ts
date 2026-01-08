import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getUserId } from "@/lib/auth";

export async function GET(req: Request) {
  await connectDB();
  const userId = getUserId(req);
  const user = await User.findById(userId).select("-password");
  return Response.json(user);
}
