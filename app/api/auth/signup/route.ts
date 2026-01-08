import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    await connectDB();
    const {name, email, password} = await req.json();

    const existing = await User.findOne({email});
    if (existing) {
        return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return Response.json({message: "User created", userId: user._id});
}