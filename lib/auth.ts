import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded: any = verifyToken(token);
    return decoded.id;
  } catch {
    return null;
  }
}
