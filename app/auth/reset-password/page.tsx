"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function ResetPasswordNew() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
        <div className="space-y-2">
          <Lock className="text-[#1B91D7]" size={32} />
          <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter">New Password</h2>
          <p className="text-zinc-500 text-[9px] font-black uppercase">Create a secure new password</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-[9px] font-black uppercase">New Password</Label>
            <Input type="password" className="bg-zinc-950 border-zinc-800 h-11 text-white" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-[9px] font-black uppercase">Confirm Password</Label>
            <Input type="password" className="bg-zinc-950 border-zinc-800 h-11 text-white" />
          </div>
        </div>
        <Button className="w-full bg-[#1B91D7] text-white font-black h-12 rounded-xl uppercase italic tracking-widest">
          Update Credentials
        </Button>
      </div>
    </div>
  );
}