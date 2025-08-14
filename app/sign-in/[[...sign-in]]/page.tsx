import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import LOGO from "@/public/LOGO.png";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-1">
      {/* Header Section */}
      <div className="mb-3">
        <Image
          src={LOGO}
          alt="Logo"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      {/* Sign In Section */}
      <div className="w-full max-w-sm">
        <SignIn
          afterSignOutUrl="/"
          appearance={{
            elements: {
              rootBox: "flex flex-col items-center",
            },
          }}
        />
      </div>
    </div>
  );
}
