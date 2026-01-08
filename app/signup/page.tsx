"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  async function handleSubmit() {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });
    router.push("/signin");
  }

  return (
    <>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit}>Signup</button>
    </>
  );
}
