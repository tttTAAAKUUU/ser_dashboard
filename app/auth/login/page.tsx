"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/service-providers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          device_name: "ser-dashboard",
        }),
      });

      const data = await response.json();
      console.log("Login API response:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-sm w-full space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            SER<span className="text-[#1B91D7]">.</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Provider Access</p>
        </div>

        <div className="bg-zinc-900 p-8 border border-zinc-800 rounded-2xl shadow-2xl space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-zinc-400 text-[9px] font-black uppercase">Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-950 border-zinc-800 text-white h-11"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-zinc-400 text-[9px] font-black uppercase">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-950 border-zinc-800 text-white h-11"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1B91D7] text-white font-black h-12 rounded-xl uppercase italic tracking-widest hover:bg-[#1B91D7]/90 disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="flex flex-col items-center gap-4 pt-4">
            <Link href="/auth/forgot-password"
                  className="text-zinc-500 hover:text-[#1B91D7] text-[9px] font-black uppercase transition-colors">
              Forgot Password or Username?
            </Link>
            <div className="h-[1px] w-full bg-zinc-800" />
            <p className="text-zinc-600 text-[9px] font-black uppercase">
              New to the fleet? <Link href="/auth/signup" className="text-[#1B91D7] hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}