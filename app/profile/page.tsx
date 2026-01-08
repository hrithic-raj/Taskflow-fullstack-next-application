import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type User = {
  name: string;
  email: string;
  createdAt: string;
};

export const dynamic = "force-dynamic"; // SSR

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 🔐 If no token → redirect
  if (!token) {
    redirect("/signin");
  }

  const res = await fetch("http://localhost:3000/api/users/me", {
    headers: {
      Cookie: `token=${token}`, // 👈 pass cookie manually
    },
    cache: "no-store",
  });

  if (res.status === 401) {
    redirect("/signin");
  }

  const user: User = await res.json();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Profile</h1>

      <div style={{ marginTop: "1rem" }}>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </main>
  );
}
