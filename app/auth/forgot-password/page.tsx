"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordRequest() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">Reset Access</h2>
          <p className="text-zinc-500 text-[9px] font-black uppercase">We will send a recovery link to your inbox</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-zinc-400 text-[9px] font-black uppercase">Registered Email</Label>
          <Input className="bg-zinc-950 border-zinc-800 h-11 text-white" placeholder="name@example.com" />
        </div>
        <Button className="w-full bg-white text-black font-black h-12 rounded-xl uppercase italic tracking-widest">
          Send Recovery Link
        </Button>
        <div className="text-center">
          <Link href="/auth/login" className="text-zinc-500 text-[9px] font-black uppercase hover:text-white">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}