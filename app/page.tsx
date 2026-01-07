"use client";

export default function Home() {
  async function login() {
    const res = await fetch("/api/login", { method: "POST" });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  }

  return <button onClick={login}>Login</button>;
}
