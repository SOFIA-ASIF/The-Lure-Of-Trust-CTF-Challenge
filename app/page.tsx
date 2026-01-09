"use client";

export default function Home() {
  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      cache: "no-store",
    });

    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);

    if (!res.ok) {
      console.error("Login failed");
      return;
    }

    const data = JSON.parse(text);
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  }

  return <button onClick={login} className="flex justify-center items-center">Login</button>;
}
