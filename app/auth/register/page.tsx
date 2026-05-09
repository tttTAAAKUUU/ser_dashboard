"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Camera, Lock, Mail, MapPin, User, Info
} from "lucide-react";

export default function ProviderSignup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirmPassword: "", otp: "",
    serviceArea: "", serviceType: "",
    bio: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Progress Bar - Updated to 6 steps */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 font-black text-xs transition-all
                ${step === s ? `border-[#1B91D7] bg-[#1B91D7] shadow-[0_0_15px_rgba(27,145,215,0.4)]` : 
                  step > s ? "border-green-500 bg-green-500" : "border-zinc-800 text-zinc-600"}`}>
                {step > s ? "✓" : s}
              </div>
              {s !== 6 && <div className={`h-[1px] w-4 ${step > s ? 'bg-green-500' : 'bg-zinc-800'}`} />}
            </div>
          ))}
        </div>

        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl shadow-2xl">
          <CardContent className="p-8">
            
            {/* STEP 1: ACCOUNT & PASSWORDS */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in">
                <div className="space-y-1">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1B91D7]">Account Setup</h3>
                  <p className="text-zinc-500 text-[9px] font-black uppercase">Create your professional credentials</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-400 text-[9px] uppercase font-black">Legal Name</Label>
                    <Input className="bg-zinc-950 border-zinc-800 h-11 focus:border-[#1B91D7]" placeholder="First Name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-400 text-[9px] uppercase font-black">Surname</Label>
                    <Input className="bg-zinc-950 border-zinc-800 h-11 focus:border-[#1B91D7]" placeholder="Last Name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-400 text-[9px] uppercase font-black">Email Address</Label>
                    <Input type="email" className="bg-zinc-950 border-zinc-800 h-11 focus:border-[#1B91D7]" placeholder="name@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-400 text-[9px] uppercase font-black">Mobile Number</Label>
                    <Input type="tel" className="bg-zinc-950 border-zinc-800 h-11 focus:border-[#1B91D7]" placeholder="+27" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-zinc-400 text-[9px] uppercase font-black">Password</Label>
                    <Input type="password" className="bg-zinc-950 border-zinc-800 h-11 focus:border-[#1B91D7]" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-zinc-400 text-[9px] uppercase font-black">Confirm</Label>
                    <Input type="password" className="bg-zinc-950 border-zinc-800 h-11 focus:border-[#1B91D7]" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-zinc-400 text-[9px] uppercase font-black">Primary Service Area</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-zinc-600" size={16} />
                    <Input className="bg-zinc-950 border-zinc-800 h-11 pl-10 focus:border-[#1B91D7]" placeholder="e.g. Bryanston, Sandton" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: EMAIL VERIFICATION (OTP) */}
            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 text-center">
                <div className="w-16 h-16 bg-[#1B91D7]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail className="text-[#1B91D7]" size={32} />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter">Verify Email</h3>
                <p className="text-zinc-500 text-[9px] font-black uppercase px-10 leading-relaxed">
                  We have sent a 6-digit verification code to your email address.
                </p>
                <div className="flex justify-center gap-2">
                  {[1,2,3,4,5,6].map(i => (
                    <input key={i} className="w-10 h-12 bg-zinc-950 border border-zinc-800 text-center font-bold text-lg rounded-lg focus:border-[#1B91D7] outline-none transition-all" maxLength={1} />
                  ))}
                </div>
                <div className="pt-2">
                  <button className="text-[9px] font-black text-[#1B91D7] uppercase tracking-widest hover:underline transition-all">
                    Resend Code
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SERVICE CATEGORY SELECTION */}
            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1B91D7]">Select Service Category</h3>
                <div className="grid grid-cols-1 gap-3">
                  {["Personal Care & Wellness", "Domestic & Laundry", "Mobile Car Wash", "Fitness & Training"].map((type) => (
                    <button 
                      key={type}
                      onClick={() => setFormData({...formData, serviceType: type})}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between
                        ${formData.serviceType === type ? `border-[#1B91D7] bg-[#1B91D7]/5 shadow-[inset_0_0_10px_rgba(27,145,215,0.05)]` : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'}`}
                    >
                      <span className={`font-black uppercase text-[10px] ${formData.serviceType === type ? 'text-[#1B91D7]' : 'text-zinc-400'}`}>{type}</span>
                      {formData.serviceType === type && <CheckCircle2 size={16} className="text-[#1B91D7]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: PROFILE START (PHOTO & BIO) */}
            {step === 4 && (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1B91D7]">Profile Identity</h3>
                  <p className="text-zinc-500 text-[9px] font-black uppercase">How customers will see you</p>
                </div>

                <div className="flex flex-col items-center gap-4 py-4">
                   <div className="relative group">
                     <div className="w-24 h-24 rounded-full bg-zinc-950 border-2 border-dashed border-zinc-800 flex items-center justify-center overflow-hidden group-hover:border-[#1B91D7] transition-all">
                        <Camera className="text-zinc-700 group-hover:text-[#1B91D7]" size={24} />
                     </div>
                     <button className="absolute bottom-0 right-0 p-2 bg-[#1B91D7] rounded-full border-2 border-zinc-900">
                        <Camera size={12} className="text-white" />
                     </button>
                   </div>
                   <p className="text-zinc-400 text-[8px] font-black uppercase">Upload Profile Photo</p>
                </div>

                <div className="space-y-1.5">
                   <Label className="text-zinc-400 text-[9px] uppercase font-black">Professional Bio</Label>
                   <Textarea 
                    className="bg-zinc-950 border-zinc-800 min-h-[100px] focus:border-[#1B91D7] text-xs font-bold" 
                    placeholder="Tell clients about your experience and specialty..."
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                   />
                </div>

                <div className="bg-[#1B91D7]/5 border border-[#1B91D7]/20 p-4 rounded-xl flex gap-3 items-start">
                   <Info className="text-[#1B91D7] shrink-0" size={16} />
                   <p className="text-[9px] font-black uppercase text-zinc-400 leading-relaxed">
                     <span className="text-[#1B91D7]">Note:</span> You will be able to add a full portfolio (pictures of your work) to the Profile Tab of your dashboard after sign up is complete.
                   </p>
                </div>
              </div>
            )}

            {/* STEP 5: STRIPE KYC */}
            {step === 5 && (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <div className="text-center space-y-3">
                  <ShieldCheck className="text-[#635BFF] mx-auto" size={40} />
                  <h3 className="text-xl font-black italic uppercase tracking-tighter">Stripe Identity</h3>
                  <p className="text-zinc-500 text-[9px] font-black uppercase px-6">Required for secure payouts and security clearance.</p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl space-y-4">
                   <div className="space-y-1.5">
                     <Label className="text-zinc-400 text-[9px] uppercase font-black">ID / Passport Number</Label>
                     <Input className="bg-zinc-900 border-zinc-800 h-11 focus:border-[#1B91D7]" placeholder="Enter RSA ID" />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-zinc-800 rounded-xl hover:bg-zinc-900 transition-colors">
                        <Camera className="text-zinc-600" size={18} />
                        <span className="text-[8px] font-black uppercase text-zinc-600">Front of ID</span>
                      </button>
                      <button className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-zinc-800 rounded-xl hover:bg-zinc-900 transition-colors">
                        <Camera className="text-zinc-600" size={18} />
                        <span className="text-[8px] font-black uppercase text-zinc-600">Back of ID</span>
                      </button>
                   </div>
                </div>
              </div>
            )}

            {/* STEP 6: SUCCESS */}
            {step === 6 && (
              <div className="text-center space-y-6 animate-in zoom-in">
                <div className="w-20 h-20 bg-[#1B91D7]/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(27,145,215,0.2)]">
                  <CheckCircle2 className="text-[#1B91D7]" size={40} />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Onboarding Active</h3>
                <p className="text-zinc-500 text-[9px] font-black uppercase px-10 leading-relaxed">
                  Your application is under review. Check your email for further instructions regarding your safety clearance.
                </p>
                <Button className="w-full bg-[#1B91D7] text-white font-black h-12 rounded-xl uppercase italic tracking-widest shadow-[0_4px_15px_rgba(27,145,215,0.3)]" onClick={() => window.location.href = '/dashboard'}>
                  Go to Dashboard
                </Button>
              </div>
            )}

            {step < 6 && (
              <div className="flex gap-4 mt-10 pt-6 border-t border-zinc-800/50">
                {step > 1 && (
                  <Button variant="ghost" onClick={prevStep} className="flex-1 text-zinc-500 hover:text-white font-black uppercase text-[10px] h-12">
                    Back
                  </Button>
                )}
                <Button 
                  onClick={nextStep}
                  disabled={step === 3 && !formData.serviceType}
                  className="flex-1 bg-[#1B91D7] hover:bg-[#1B91D7]/90 text-white font-black h-12 rounded-xl uppercase italic tracking-widest shadow-[0_4px_15px_rgba(27,145,215,0.3)]"
                >
                  {step === 5 ? "Complete Profile" : "Continue"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}