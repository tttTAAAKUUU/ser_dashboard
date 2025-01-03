import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      {/* Header Section */}
      <div className="mb-8">
        <Image
          src="https://utfs.io/f/555e3ace-5e98-4068-883f-28033f9f5b7d-ilwz8r.png"
          alt="Logo"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>

      {/* Sign Up Section */}
      <div className="w-full max-w-sm">
        <SignUp
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