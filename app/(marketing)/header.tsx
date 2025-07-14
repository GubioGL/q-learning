import Image from "next/image"
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

export const Header = () => {
    return (
        <header className="px-4 h-20 w-full border-b-2 border-slate-200">
            <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <div className="flex items-center gap-3">
                    <Image src="/Logoket.png" alt="Quantum Learning" width={40} height={40} />
                    <h1 className="text-2xl font-extrabold text-purple-700 tracking-wide">Quantum Learning</h1>
                </div>
                <div className="flex items-center gap-2">
                    {/* Caso não esteja logado  */}
                    <SignedOut>
                        {/* Fazer login */}
                        <SignInButton forceRedirectUrl="/">
                            <button className="bg-transparent text-orange-500 border-0 border-transparent hover:bg-slate-100 rounded-full p-4 space-y-4 flex flex-col max-w-[200px] sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer transition-colors">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                    {/* Caso esteja logado */}
                    <SignedIn>
                        {/* Fazer logout */}
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}