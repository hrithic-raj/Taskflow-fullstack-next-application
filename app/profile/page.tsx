export const dynamic = "force-dynamic";

export default async function Profile() {
  const user = await fetch("http://localhost:3000/api/users/me", {
    headers: {
      Authorization: `Bearer YOUR_TOKEN`,
    },
    cache: "no-store",
  }).then(res => res.json());

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
