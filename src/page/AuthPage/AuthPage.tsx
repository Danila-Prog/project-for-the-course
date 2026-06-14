import Image from "next/image";
import SignIn from "./ui/SignIn";

export function AuthPage() {
  return (
    <div className="lg:flex w-full">
      <Image
        className="hidden lg:block w-full lg:w-[45%] lg:h-screen bg-cover bg-center bg-no-repeat rounded-r-3xl shadow-xl aspect-auto object-cover"
        src="/icons/bg-auth.jpeg"
        width={800}
        height={1100}
        alt="background truck"
      />

      <div className="w-full h-screen flex items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
}
