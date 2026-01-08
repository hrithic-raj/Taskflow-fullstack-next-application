import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
    await connectDB();
    const { email, password } = await req.json();
    
    const user = await User.findOne({ email });
    if (!user) {
        return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ id: user._id });

    return Response.json({ token });
}