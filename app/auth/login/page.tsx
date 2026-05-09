"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
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
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-[9px] font-black uppercase">Email Address</Label>
            <Input className="bg-zinc-950 border-zinc-800 text-white h-11" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-[9px] font-black uppercase">Password</Label>
            <Input type="password" className="bg-zinc-950 border-zinc-800 text-white h-11" />
          </div>
          <Button className="w-full bg-[#1B91D7] text-white font-black h-12 rounded-xl uppercase italic tracking-widest">
            Sign In
          </Button>

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