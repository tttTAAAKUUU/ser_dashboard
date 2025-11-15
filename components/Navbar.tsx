"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LOGO from "../public/LOGO.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiUser, FiLogOut, FiStar } from "react-icons/fi";

interface User {
  name: string;
  photo?: string;
  rating?: number;
}

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Favourites", href: "/favourites" },
  { name: "History", href: "/appointments" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight - 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser({
          name: "John Doe",
          photo: "/default-avatar.png",
          rating: 4.7,
        });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex justify-between items-center h-20 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/home" scroll={false}>
          <Image
            src={LOGO}
            alt="Logo"
            width={160}
            height={60}
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`text-[#1B91D7] hover:text-blue-500 font-medium transition`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {isLoggedIn ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <Image
                  src={user?.photo || "/default-avatar.png"}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full border border-gray-300"
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-100 z-50">
                  <div className="flex items-center gap-3 p-3 border-b">
                    <Image
                      src={user?.photo || "/default-avatar.png"}
                      alt="Profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {user?.name || "User"}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <FiStar className="text-yellow-500" />
                        {user?.rating?.toFixed(1) || "4.7"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col text-sm text-gray-700">
                    <Link href="/help" className="hover:bg-gray-100 px-4 py-2">
                      Help & FAQ
                    </Link>
                    <Link href="/wallet" className="hover:bg-gray-100 px-4 py-2">
                      Wallet
                    </Link>
                    <Link href="/inbox" className="hover:bg-gray-100 px-4 py-2">
                      Inbox
                    </Link>
                    <Link href="/earn" className="hover:bg-gray-100 px-4 py-2">
                      Earn with Your Skill
                    </Link>
                    <Link href="/add-store" className="hover:bg-gray-100 px-4 py-2">
                      Add Your Store
                    </Link>
                    <Link href="/account" className="hover:bg-gray-100 px-4 py-2">
                      Manage Ser Account
                    </Link>
                    <Link href="/appointments" className="hover:bg-gray-100 px-4 py-2">
                      Appointment History
                    </Link>
                    <Link href="/favourites" className="hover:bg-gray-100 px-4 py-2">
                      Favourites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 px-4 py-2 hover:bg-gray-100"
                    >
                      <FiLogOut /> Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="px-5 py-2 bg-[#1B91D7] text-white rounded-lg hover:bg-blue-400 transition">
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button className="px-5 py-2 border border-[#1B91D7] text-[#1B91D7] rounded-lg hover:bg-[#1B91D7] hover:text-white transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#1B91D7] focus:outline-none"
        >
          <AiOutlineMenu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 text-lg">
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 text-[#1B91D7]"
          >
            <AiOutlineClose size={28} />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={toggleMenu}
              className="text-[#1B91D7] hover:text-blue-500 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
