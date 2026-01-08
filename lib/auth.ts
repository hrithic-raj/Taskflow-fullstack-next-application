import { verifyToken } from "./jwt";

export function getUserId(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");
  const decoded: any = verifyToken(token);
  return decoded.id;
}