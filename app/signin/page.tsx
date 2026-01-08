"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    router.push("/");
  }

  return (
    <>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </>
  );
}
