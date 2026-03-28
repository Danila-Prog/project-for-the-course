import Image from "next/image";
import SignIn from "./ui/SignIn";

export function AuthPage() {
  return (
    <div className="flex">
      <Image
        className="w-[45%] h-[97vh] bg-cover bg-center bg-no-repeat rounded-2xl shadow-xl m-2"
        src="/icons/bg-auth.jpeg"
        width={200}
        height={300}
        alt=""
      />

      <div className="relative w-full">
        <SignIn />
      </div>
    </div>
  );
}
