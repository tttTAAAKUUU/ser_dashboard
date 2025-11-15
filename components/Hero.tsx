import Link from "next/link";
import Image from "next/image";
import hero3 from "../public/hero3.jpg";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center">
      {/* Background Image */}
      <Image
        src={hero3}
        alt="man getting haircut"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-[#1B91D7] to-blue-600 bg-clip-text text-transparent leading-tight">
          SELF CARE <br /> FROM YOUR HOME.
        </h1>
        <p className="text-white mt-6 text-lg md:text-xl">
          Make your order now and enjoy premium service at home.
        </p>
        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center md:justify-start">
          <Link href="/appointment">
            <button className="bg-[#1B91D7] hover:bg-blue-400 text-black font-medium px-6 py-3 rounded-lg shadow-lg transition">
              Book an appointment
            </button>
          </Link>
          <Link href="/partner">
            <button className="border border-[#1B91D7] text-[#1B91D7] hover:bg-[#1B91D7] hover:text-black font-medium px-6 py-3 rounded-lg shadow-lg transition">
              Become a care partner
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
