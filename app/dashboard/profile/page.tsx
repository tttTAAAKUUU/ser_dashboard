"use client";
import React, { useState } from "react";
import { 
  User, Mail, MapPin, Star, Camera, Edit3, 
  Plus, Check, MessageSquare, Briefcase, Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Mock Data for the Profile
const initialProfile = {
  name: "Takudzwa Tembedza",
  specialization: "Professional Grooming & Hair Specialist",
  location: "Bryanston, Johannesburg",
  bio: "Specializing in modern fades, knotless braids, and premium grooming services. Over 5 years of experience serving the Sandton and Bryanston area with a focus on hygiene and precision.",
  rating: 4.9,
  totalReviews: 124,
  portfolio: [
    "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=300",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=300",
    "https://images.unsplash.com/photo-1646245139744-bb5004387c69?q=80&w=300",
  ],
  reviews: [
    { id: 1, user: "Lindiwe M.", rating: 5, comment: "Best braids in Bryanston! Super professional and quick.", date: "2 days ago" },
    { id: 2, user: "Sipho N.", rating: 4, comment: "Great fade, very clean setup. Will definitely book again.", date: "1 week ago" },
    { id: 3, user: "Nomsa R.", rating: 5, comment: "Always punctual and the results are amazing.", date: "2 weeks ago" },
  ]
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen text-white">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Profile View & Edit */}
        <div className="flex-1 space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">Public Profile</h1>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">How clients see you</p>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "font-black uppercase text-[10px] tracking-widest h-10 px-6",
                isEditing ? "bg-emerald-600 hover:bg-emerald-500" : "bg-zinc-800 hover:bg-zinc-700"
              )}
            >
              {isEditing ? <><Check size={14} className="mr-2"/> Save Profile</> : <><Edit3 size={14} className="mr-2"/> Edit Profile</>}
            </Button>
          </header>

          {/* Profile Header Card */}
          <Card className="bg-[#0B101A] border-zinc-800 p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center overflow-hidden">
                  <User size={48} className="text-zinc-700" />
                </div>
                {isEditing && (
                  <button className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                    <Camera size={24} />
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input defaultValue={profile.name} className="bg-zinc-950 border-zinc-800 text-xl font-bold h-12" />
                    <Input defaultValue={profile.specialization} className="bg-zinc-950 border-zinc-800 text-blue-400 font-bold" />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase">{profile.name}</h2>
                    <p className="text-[#1B91D7] font-bold text-sm">{profile.specialization}</p>
                    <div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
                      <div className="flex items-center gap-1 text-zinc-400 text-xs font-bold uppercase">
                        <MapPin size={14} className="text-zinc-600" /> {profile.location}
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                        <Star size={14} fill="currentColor" /> {profile.rating} ({profile.totalReviews})
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-900">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block">Professional Bio</label>
              {isEditing ? (
                <Textarea defaultValue={profile.bio} className="bg-zinc-950 border-zinc-800 min-h-[120px]" />
              ) : (
                <p className="text-zinc-400 text-sm leading-relaxed">{profile.bio}</p>
              )}
            </div>
          </Card>

          {/* Portfolio Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-end">
               <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Work Portfolio</h3>
               {isEditing && (
                 <Button variant="ghost" className="text-[10px] font-black uppercase text-blue-400 p-0 h-auto">
                   <Plus size={14} className="mr-1"/> Add Photo
                 </Button>
               )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.portfolio.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl border border-zinc-800 overflow-hidden group">
                  <img src={img} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" alt="Work" />
                  {isEditing && (
                    <button className="absolute top-2 right-2 p-1.5 bg-red-500/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button className="aspect-square rounded-xl border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600 hover:border-zinc-700 hover:text-zinc-400 transition-all">
                  <Camera size={24} className="mb-2" />
                  <span className="text-[10px] font-black uppercase">Upload</span>
                </button>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Reviews & Ratings */}
        <aside className="w-full lg:w-80 space-y-6">
          <Card className="bg-[#0B101A] border-zinc-800 p-6 sticky top-6">
            <div className="text-center pb-6 border-b border-zinc-900">
              <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-4">Service Rating</h3>
              <div className="text-5xl font-black text-white italic mb-2">{profile.rating}</div>
              <div className="flex justify-center gap-1 text-yellow-500 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= 4 ? "currentColor" : "none"} stroke="currentColor" />)}
              </div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Based on {profile.totalReviews} jobs</p>
            </div>

            <div className="pt-6 space-y-6">
              <h3 className="text-[10px] font-black uppercase text-[#1B91D7] tracking-widest flex items-center gap-2">
                <MessageSquare size={14} /> Recent Feedback
              </h3>
              <div className="space-y-4">
                {profile.reviews.map(review => (
                  <div key={review.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase text-white">{review.user}</span>
                      <span className="text-[9px] font-bold text-zinc-600 uppercase">{review.date}</span>
                    </div>
                    <div className="flex text-yellow-600 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-normal italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full border-zinc-800 text-zinc-500 text-[10px] font-black uppercase hover:text-white">
                View All Reviews
              </Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");