export const dynamic = "force-dynamic";

export default async function Profile() {
  const user = { name: "Hrithic", role: "User" };

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.role}</p>
    </div>
  );
}