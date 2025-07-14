import { Button } from "@/components/ui/button";
import { ClerkLoaded, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-center mb-4">
          <span className="block text-purple-700">Welcome to the</span>
          <span className="block text-purple-700 ">
            Path of Quantum Learning
          </span>
        </p>
        <Image
          src="/caticonpng.png"
          alt="Logo Quantum Learning"
          width={250}
          height={250}
          className="mb-4"
        />
        <ClerkLoaded>
          <SignedOut>
            <div className="flex flex-col items-center gap-2 w-full">
              <SignUpButton forceRedirectUrl="/">
                <button className="bg-orange-400 text-white border-orange-600 border-b-4 active:border-b-0 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer transition-colors w-full max-w-md">
                  Create an account
                </button>
              </SignUpButton>
              <SignInButton forceRedirectUrl="/">
                <button className="bg-white text-orange-500 hover:bg-slate-100 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer transition-colors w-full max-w-md">
                  I already have an account!
                </button>
              </SignInButton>
            </div>
            
          </SignedOut>
          <SignedIn>
            <Link href="/learn">
              <Button variant="buttonRox">Continue to the learning platform</Button>
            </Link>
          </SignedIn>
        </ClerkLoaded>
      </div>



      <div className="flex justify-center mb-6">
        <p className="text-base text-center text-gray-400 max-w-xl">
          <span>“What I cannot create, I do not understand. </span>
          <span>Know how to solve every problem that has been Solved.” — Richard Feynman</span>
        </p>
      </div>
    </div>
  );
}
