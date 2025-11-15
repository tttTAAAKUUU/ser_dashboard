import Image from "next/image";
import LOGO from "@/public/LOGO.png";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <Image
        src={LOGO}
        alt="Logo"
        width={300}
        height={300}
        className="object-contain mb-4"
      />
      <p className="text-gray-700 font-medium text-center">
        Sign-in functionality coming soon!
      </p>
    </div>
  );
}
